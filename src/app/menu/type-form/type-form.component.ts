import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DishType } from '@common/interfaces/dish-type';
import { KeyValue } from '@common/interfaces/type';
import { DishTypesService } from '@common/services/dish-types.service';
import { AnyDto } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

export interface TypeInputData {
  shopId: string;
  doc?: AnyDto<DishType>;
}

@Component({
  selector: 'app-menu-type-form',
  templateUrl: './type-form.component.html'
})
export class TypeFormComponent implements OnInit {
  form!: FormGroup;
  tips: any = {
    name: {
      default: {
        required: $localize`类型名称不能为空`
      }
    }
  };
  scopeItems: Array<KeyValue<number>> = [
    { key: $localize`堂食`, value: 1 },
    { key: $localize`快餐`, value: 2 },
    { key: $localize`外卖`, value: 3 }
  ];

  constructor(
    @Inject(NZ_MODAL_DATA) public data: TypeInputData,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private fb: FormBuilder,
    private types: DishTypesService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      shop_id: [this.data.shopId],
      name: [null, [Validators.required]],
      sn: [null, [Validators.required]],
      scopes: [[], [Validators.required]],
      period: this.fb.group({
        enabled: [false, [Validators.required]],
        rules: this.fb.array([])
      })
    });
    if (this.data.doc) {
      const ruleLen = this.data.doc.period.rules.length;
      for (let i = 0; i < ruleLen; i++) {
        this.appendRule();
      }
      this.form.patchValue(this.data.doc);
    }
  }

  get period(): FormGroup {
    return this.form?.get('period') as FormGroup;
  }

  get rules(): FormArray {
    return this.period.get('rules') as FormArray;
  }

  appendRule(value?: string): void {
    this.rules.push(
      this.fb.group({
        name: [null, [Validators.required]],
        value: this.fb.array([
          this.fb.control(new Date(), [Validators.required]),
          this.fb.control(new Date(), [Validators.required])
        ])
      })
    );
  }

  removeRule(index: number): void {
    this.rules.removeAt(index);
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: any): void {
    if (!this.data.doc) {
      this.types
        .create(data, {
          xdata: { shop_id: 'oid', 'period.rules.$.value': 'timestamps' }
        })
        .subscribe(() => {
          this.message.success($localize`数据更新成功`);
          this.modalRef.triggerOk();
        });
    } else {
      this.types
        .updateById(
          this.data.doc._id,
          {
            $set: data
          },
          {
            xdata: { '$set.shop_id': 'oid', '$set.period.rules.$.value': 'timestamps' }
          }
        )
        .subscribe(() => {
          this.message.success($localize`数据更新成功`);
          this.modalRef.triggerOk();
        });
    }
  }
}
