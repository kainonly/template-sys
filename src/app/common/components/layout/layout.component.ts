import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppService } from '@app';
import { SidenavComponent } from '@common/components/layout/sidenav/sidenav.component';
import { WpxService } from '@weplanx/ng';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';

import { ProfileComponent } from './profile/profile.component';

@Component({
  selector: 'app-layout',
  templateUrl: 'layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  @ViewChild('sidenavTitleRef') sidenavTitleRef!: TemplateRef<any>;
  @ViewChild('profileTitleRef') profileTitleRef!: TemplateRef<any>;
  private sidenavRef?: NzDrawerRef<SidenavComponent, any>;
  private profileRef?: NzDrawerRef<ProfileComponent, any>;

  constructor(
    private wpx: WpxService,
    public app: AppService,
    private router: Router,
    private route: ActivatedRoute,
    private drawer: NzDrawerService
  ) {}

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
