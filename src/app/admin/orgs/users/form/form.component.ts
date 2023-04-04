import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { User } from '@common/interfaces/user';
import { UsersService } from '@common/services/users.service';
import { AnyDto, validates, WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-admin-orgs-users-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  tips = {
    email: {
      default: {
        required: $localize`电子邮件不能为空`,
        duplicated: $localize`存在重复的定义，电子邮件必须是唯一的`
      }
    },
    password: {
      default: {
        required: $localize`密码不能为空`,
        minlength: $localize`密码长度必须大于6位`
      }
    }
  };
  @Input() doc?: AnyDto<User>;
  form!: FormGroup;
  passwordVisible = false;

  constructor(
    public wpx: WpxService,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder,
    private users: UsersService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email], [this.checkEmail]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: [''],
      avatar: [''],
      status: [true, [Validators.required]]
    });
    if (this.doc) {
      this.form.get('password')?.setValidators([Validators.minLength(6)]);
      this.form.patchValue(this.doc);
    }
  }

  checkEmail = (control: AbstractControl): Observable<any> => {
    if (control.value === this.doc?.email) {
      return of(null);
    }
    return this.users.existsEmail(control.value);
  };

  validedPassword = (control: AbstractControl): any => {
    if (!control.value) {
      return !this.doc ? { required: true } : null;
    }
    return validates.password(control.value);
  };

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(value: any): void {
    if (!this.doc) {
      this.users
        .create(value, {
          xdata: { password: 'password' }
        })
        .subscribe(() => {
          this.message.success($localize`数据更新成功`);
          this.modalRef.triggerOk();
        });
    } else {
      if (!value.password) {
        delete value.password;
      }
      this.users
        .updateById(
          this.doc._id,
          {
            $set: value
          },
          {
            xdata: { password: 'password' }
          }
        )
        .subscribe(() => {
          this.message.success($localize`数据更新成功`);
          this.modalRef.triggerOk();
        });
    }
  }
}
