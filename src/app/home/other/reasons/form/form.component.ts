import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Reason } from '@common/interfaces/reason';
import { ReasonsService } from '@common/services/reasons.service';
import { AnyDto } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { categories } from '../categories';

export interface InputData {
  shopId: string;
  doc?: AnyDto<Reason>;
}

@Component({
  selector: 'app-home-other-reasons-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  tips: any = {
    sn: {
      default: {
        required: $localize`理由编号不能为空`
      }
    },
    content: {
      default: {
        required: $localize`理由内容不能为空`
      }
    }
  };
  categoryMap = categories;

  constructor(
    @Inject(NZ_MODAL_DATA) public data: InputData,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private fb: FormBuilder,
    private reasons: ReasonsService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      category: [0, [Validators.required]],
      sn: [null, [Validators.required]],
      content: [null, [Validators.required]],
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
      this.reasons
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
      this.reasons
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
