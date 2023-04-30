import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AppService } from '@app';
import { AvatarComponent } from '@common/components/layout/avatar/avatar.component';
import { BackupEmailComponent } from '@common/components/layout/backup-email/backup-email.component';
import { EmailComponent } from '@common/components/layout/email/email.component';
import { NameComponent } from '@common/components/layout/name/name.component';
import { PasswordComponent } from '@common/components/layout/password/password.component';
import { Shop } from '@common/interfaces/shop';
import { ShopsService } from '@common/services/shops.service';
import { AnyDto, WpxData } from '@weplanx/ng';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-layout',
  templateUrl: 'layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  sidenavVisible = false;
  sidenavSearchText = '';
  sidenavData: WpxData<AnyDto<Shop>> = new WpxData();

  profileVisible = false;

  shop?: AnyDto<Shop>;

  private changesSubscription?: Subscription;

  constructor(
    public app: AppService,
    private shops: ShopsService,
    private router: Router,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.changesSubscription = this.app.changes.subscribe(data => {
      if (data.hasOwnProperty('shopId')) {
        if (data['shopId']) {
          this.getShop();
        } else {
          this.shop = undefined;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.changesSubscription?.unsubscribe();
  }

  getShop(): void {
    this.shops.findById(this.app.shopId!).subscribe(data => {
      this.shop = data;
    });
  }

  openSidenav(): void {
    this.sidenavVisible = true;
    this.getSidenavData();
  }

  closeSidenav(): void {
    this.sidenavVisible = false;
  }

  getSidenavData(): void {
    this.sidenavData.filter = {};
    if (this.sidenavSearchText) {
      this.sidenavData.filter.name = { $regex: this.sidenavSearchText };
    }
    this.shops.pages(this.sidenavData, true).subscribe(() => {});
  }

  admin(): void {
    this.closeSidenav();
    this.router.navigateByUrl('/settings');
  }

  openProfile(): void {
    this.profileVisible = true;
  }

  closeProfile(): void {
    this.profileVisible = false;
  }

  logout(): void {
    this.app.logout().subscribe(() => {
      this.app.user = undefined;
      this.closeProfile();
      this.router.navigateByUrl('/login');
    });
  }

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
        this.app.user = undefined;
        this.closeProfile();
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
