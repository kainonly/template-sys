import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AppService } from '@app';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-layout-profile-backup-email',
  templateUrl: './backup-email.component.html'
})
export class BackupEmailComponent implements OnInit {
  tips = {
    email: {
      default: {
        email: $localize`电子邮件格式不规范`
      }
    }
  };
  form!: FormGroup;

  constructor(
    private app: AppService,
    private modalRef: NzModalRef,
    private fb: FormBuilder,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      backup_email: [null, [Validators.email]]
    });
    this.form.patchValue(this.app.user!);
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: any): void {
    this.app
      .setUser({
        $set: 'backup_email',
        backup_email: data.backup_email
      })
      .subscribe(() => {
        this.message.success($localize`数据更新成功`);
        this.modalRef.triggerOk();
      });
  }
}
