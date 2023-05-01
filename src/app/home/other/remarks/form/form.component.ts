import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Remark } from '@common/interfaces/remark';
import { RemarksService } from '@common/services/remarks.service';
import { AnyDto } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

export interface InputData {
  shopId: string;
  doc?: AnyDto<Remark>;
}

@Component({
  selector: 'app-home-other-remarks-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  tips: any = {
    sn: {
      default: {
        required: $localize`编号不能为空`
      }
    },
    content: {
      default: {
        required: $localize`内容不能为空`
      }
    }
  };

  constructor(
    @Inject(NZ_MODAL_DATA) public data: InputData,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private fb: FormBuilder,
    private remarks: RemarksService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      sn: [null, [Validators.required]],
      content: [null, [Validators.required]],
      offset: [0, [Validators.required]],
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
      this.remarks
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
      this.remarks
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
