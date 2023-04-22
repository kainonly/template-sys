import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AppService } from '@app';
import { SidenavComponent } from '@common/components/layout/sidenav/sidenav.component';
import { Shop } from '@common/interfaces/shop';
import { ShopsService } from '@common/services/shops.service';
import { AnyDto, WpxService } from '@weplanx/ng';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';

import { ProfileComponent } from './profile/profile.component';

@Component({
  selector: 'app-layout',
  templateUrl: 'layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  @ViewChild('sidenavTitleRef') sidenavTitleRef!: TemplateRef<any>;
  @ViewChild('profileTitleRef') profileTitleRef!: TemplateRef<any>;
  private sidenavRef?: NzDrawerRef<SidenavComponent, any>;
  private profileRef?: NzDrawerRef<ProfileComponent, any>;

  shop?: AnyDto<Shop>;

  private changesSubscription?: Subscription;

  constructor(
    private wpx: WpxService,
    public app: AppService,
    private shops: ShopsService,
    private router: Router,
    private route: ActivatedRoute,
    private drawer: NzDrawerService
  ) {}

  ngOnInit(): void {
    this.app.changes.subscribe(data => {
      if (data['shopId']) {
        this.getShop();
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
    this.sidenavRef = this.drawer.create<SidenavComponent>({
      nzTitle: this.sidenavTitleRef,
      nzContent: SidenavComponent,
      nzPlacement: 'left'
    });
  }

  closeSidenav(): void {
    this.sidenavRef?.close();
  }

  openProfile(): void {
    this.profileRef = this.drawer.create<ProfileComponent, any>({
      nzTitle: this.profileTitleRef,
      nzWidth: '800px',
      nzContent: ProfileComponent
    });
  }

  logout(): void {
    this.app.logout().subscribe(() => {
      this.app.user = undefined;
      this.profileRef?.close();
      this.router.navigateByUrl('/login');
    });
  }
}
