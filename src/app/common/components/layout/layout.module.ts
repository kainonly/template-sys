import { NgModule } from '@angular/core';

import { AvatarComponent } from '@common/components/layout/avatar/avatar.component';
import { BackupEmailComponent } from '@common/components/layout/backup-email/backup-email.component';
import { EmailComponent } from '@common/components/layout/email/email.component';
import { NameComponent } from '@common/components/layout/name/name.component';
import { PasswordComponent } from '@common/components/layout/password/password.component';
import { ShareModule } from '@common/share.module';

import { LayoutComponent } from './layout.component';

@NgModule({
  imports: [ShareModule],
  declarations: [
    LayoutComponent,
    EmailComponent,
    NameComponent,
    AvatarComponent,
    PasswordComponent,
    BackupEmailComponent
  ],
  exports: [LayoutComponent]
})
export class LayoutModule {}
