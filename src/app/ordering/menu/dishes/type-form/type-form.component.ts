import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DishTypePeriodRule } from '@common/interfaces/dish-type';
import { XData } from '@weplanx/ng';
import { WpxQuickFormData } from '@weplanx/ng/quick';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

export interface TypeFormData extends WpxQuickFormData {
  restaurant_id: string;
}

@Component({
  selector: 'app-ordering-menu-dishes-type-form',
  templateUrl: './type-form.component.html'
})
export class TypeFormComponent implements OnInit {
  form!: FormGroup;
  tips: any = {
    name: {
      default: {
        required: $localize`类型名称不能为空`
      }
    },
    sn: {
      default: {
        required: $localize`类型编码不能为空`
      }
    }
  };

  constructor(
    @Inject(NZ_MODAL_DATA) public data: TypeFormData,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      restaurant_id: [this.data.restaurant_id],
      name: [null, [Validators.required]],
      sn: [null, [Validators.required]],
      period: this.fb.group({
        enabled: [false, [Validators.required]],
        rules: this.fb.array([])
      })
    });
    if (this.data.doc) {
      this.form.patchValue(this.data.doc);
    }
  }

  get rules(): FormArray {
    return this.form?.get('period')?.get('rules') as FormArray;
  }

  appendRule(value?: string): void {
    this.rules.push(
      this.fb.group({
        name: [null, [Validators.required]],
        value: this.fb.array([
          this.fb.control(null, [Validators.required]),
          this.fb.control(null, [Validators.required])
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
      const rules: DishTypePeriodRule[] = data.period.rules;
      const xrules: Record<string, XData> = {};
      for (let i = 0; i < rules.length; i++) {
        xrules[`period.rules.${i}.value.0`] = 'timestamp';
        xrules[`period.rules.${i}.value.1`] = 'timestamp';
      }
      this.data.api
        .create(data, {
          xdata: { restaurant_id: 'oid', ...xrules }
        })
        .subscribe(() => {
          this.message.success($localize`数据更新成功`);
          this.modalRef.triggerOk();
        });
    } else {
      this.data.api
        .updateById(
          this.data.doc._id,
          {
            $set: data
          },
          {
            xdata: { '$set.restaurant_id': 'oid' }
          }
        )
        .subscribe(() => {
          this.message.success($localize`数据更新成功`);
          this.modalRef.triggerOk();
        });
    }
  }
}