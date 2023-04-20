import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WpxQuickFormData } from '@weplanx/ng/quick';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-marketing-member-lists-level-form',
  templateUrl: './level-form.component.html'
})
export class LevelFormComponent implements OnInit {
  form!: FormGroup;
  tips: any = {
    name: {
      default: {
        required: $localize`等级名称不能为空`
      }
    },
    code: {
      defalut: {
        required: $localize`等级代码不能为空`
      }
    }
  };

  constructor(
    @Inject(NZ_MODAL_DATA) public data: WpxQuickFormData,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      code: [null, [Validators.required]],
      discount: this.fb.group({
        room: [0, [Validators.required]],
        dining: [0, [Validators.required]],
        other: [0, [Validators.required]]
      }),
      upgrade: this.fb.group({
        mode: [0, [Validators.required]],
        amount: [0, [Validators.required]]
      }),
      benefits: [[], [Validators.required]],
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
      this.data.api
        .create(data, {
          xdata: { benefits: 'oids' }
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
            xdata: { '$set.benefits': 'oids' }
          }
        )
        .subscribe(() => {
          this.message.success($localize`数据更新成功`);
          this.modalRef.triggerOk();
        });
    }
  }
}
