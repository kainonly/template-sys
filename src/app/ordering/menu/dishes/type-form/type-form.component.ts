import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WpxQuickFormData } from '@weplanx/ng/quick';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

export interface TagFormData extends WpxQuickFormData {
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
    }
  };

  constructor(
    @Inject(NZ_MODAL_DATA) public data: TagFormData,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      restaurant_id: [this.data.restaurant_id],
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
          xdata: { restaurant_id: 'oid' }
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
