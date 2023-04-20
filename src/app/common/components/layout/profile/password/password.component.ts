import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AppService } from '@app';
import { validates } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-layout-profile-password',
  templateUrl: './password.component.html'
})
export class PasswordComponent implements OnInit {
  tips: any = {
    password: {
      default: {
        required: $localize`新密码不能为空`,
        minlength: $localize`新密码不能小于 8 位`,
        lowercase: $localize`新密码需要包含小写字母`,
        uppercase: $localize`新密码需要包含大写字母`,
        number: $localize`新密码需要包含数字`,
        symbol: $localize`新密码需要包含符号 (@$!%*?&-+)`
      }
    }
  };
  form!: FormGroup;
  passwordVisible = false;

  constructor(
    private app: AppService,
    private modalRef: NzModalRef,
    private fb: FormBuilder,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      password: [null, [Validators.required, this.validedPassword]]
    });
  }

  validedPassword = (control: AbstractControl): any => {
    if (!control.value) {
      return;
    }
    return validates.password(control.value);
  };

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: any): void {
    this.app
      .setUser({
        $set: 'password',
        password: data.password
      })
      .subscribe(() => {
        this.message.success($localize`数据更新成功`);
        this.modalRef.triggerOk();
      });
  }
}
