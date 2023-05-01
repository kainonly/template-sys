import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Recharge } from '@common/interfaces/recharge';
import { RechargesService } from '@common/services/recharges.service';
import { AnyDto } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

export interface InputData {
  shopId: string;
  doc?: AnyDto<Recharge>;
}

@Component({
  selector: 'app-home-other-recharge-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  tips: any = {
    name: {
      default: {
        required: $localize`名称不能为空`
      }
    }
  };

  constructor(
    @Inject(NZ_MODAL_DATA) public data: InputData,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private fb: FormBuilder,
    private recharges: RechargesService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      pay: [0, [Validators.required]],
      gift: this.fb.group({
        bonus: [0, [Validators.required]],
        points: [0, [Validators.required]]
      }),
      valid_time: [[]],
      status: [true, [Validators.required]]
    });
    if (this.data.doc) {
      this.form.patchValue(this.data.doc);
    }
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: any): void {
    if (!this.data.doc) {
      data.shop_id = this.data.shopId;
      this.recharges
        .create(data, {
          xdata: {
            shop_id: 'oid'
          }
        })
        .subscribe(() => {
          this.message.success($localize`数据更新成功`);
          this.modalRef.triggerOk();
        });
    } else {
      this.recharges
        .updateById(
          this.data.doc._id,
          { $set: data },
          {
            xdata: {
              shop_id: 'oid'
            }
          }
        )
        .subscribe(() => {
          this.message.success($localize`数据更新成功`);
          this.modalRef.triggerOk();
        });
    }
  }
}
