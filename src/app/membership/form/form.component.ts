import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Member } from '@common/interfaces/member';
import { MembersService } from '@common/services/members.service';
import { AnyDto } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

export interface InputData {
  shopId: string;
  doc?: AnyDto<Member>;
}

@Component({
  selector: 'app-membership-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  tips: any = {
    cardno: {
      default: {
        required: $localize`会员卡号不能为空`
      }
    }
  };

  constructor(
    @Inject(NZ_MODAL_DATA) public data: InputData,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private fb: FormBuilder,
    private members: MembersService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      level_id: [null, [Validators.required]],
      cardno: [null, [Validators.required]],
      profile: this.fb.group({
        name: [null, []],
        phone: [null, []],
        gender: [0, []],
        avatar: [null],
        birthday: []
      }),
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
      this.members.create(data).subscribe(() => {
        this.message.success($localize`数据更新成功`);
        this.modalRef.triggerOk();
      });
    } else {
      this.members.updateById(this.data.doc._id, { $set: data }).subscribe(() => {
        this.message.success($localize`数据更新成功`);
        this.modalRef.triggerOk();
      });
    }
  }
}
