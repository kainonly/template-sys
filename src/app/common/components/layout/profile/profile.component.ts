import { Component, Type } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

import { AppService } from '@app';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { AvatarComponent } from './avatar/avatar.component';
import { BackupEmailComponent } from './backup-email/backup-email.component';
import { EmailComponent } from './email/email.component';
import { NameComponent } from './name/name.component';
import { PasswordComponent } from './password/password.component';

@Component({
  selector: 'app-layout-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  constructor(
    public app: AppService,
    private modal: NzModalService,
    private message: NzMessageService,
    private router: Router,
    private draw: NzDrawerRef
  ) {}

  private setModal(component: Type<void>, callback?: () => void): void {
    this.modal.create({
      nzTitle: `个人信息`,
      nzContent: component,
      nzOnOk: () => {
        if (!callback) {
          this.app.getUser().subscribe(() => {});
          return;
        }
        callback();
      }
    });
  }

  setEmail(): void {
    this.setModal(EmailComponent, () => {
      this.app.logout().subscribe(() => {
        this.draw.close();
        this.app.user = undefined;
        this.router.navigateByUrl('/login');
      });
    });
  }

  setName(): void {
    this.setModal(NameComponent);
  }

  setAvatar(): void {
    this.setModal(AvatarComponent);
  }

  setPassword(): void {
    this.setModal(PasswordComponent);
  }

  setBackupEmail(): void {
    this.setModal(BackupEmailComponent);
  }
}
