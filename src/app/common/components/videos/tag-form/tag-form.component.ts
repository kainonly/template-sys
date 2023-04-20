import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WpxQuickFormData } from '@weplanx/ng/quick';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

export interface TagInputData extends WpxQuickFormData {
  shopId: string;
}

@Component({
  selector: 'app-videos-tag-form',
  templateUrl: './tag-form.component.html'
})
export class TagFormComponent implements OnInit {
  form!: FormGroup;
  tips: any = {
    name: {
      default: {
        required: $localize`标签名称不能为空`
      }
    }
  };

  constructor(
    @Inject(NZ_MODAL_DATA) public data: TagInputData,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      shop_id: [this.data.shopId],
      name: [null, [Validators.required]]
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
      this.data.api
        .create(data, {
          xdata: { shop_id: 'oid' }
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
            xdata: { '$set.shop_id': 'oid' }
          }
        )
        .subscribe(() => {
          this.message.success($localize`数据更新成功`);
          this.modalRef.triggerOk();
        });
    }
  }
}
