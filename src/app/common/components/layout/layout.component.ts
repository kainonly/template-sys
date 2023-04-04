import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppService } from '@app';
import { WpxService } from '@weplanx/ng';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';

import { ProfileComponent } from './profile/profile.component';

@Component({
  selector: 'app-layout',
  templateUrl: 'layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  @ViewChild('profileTitleTpl') profileTitleTpl!: TemplateRef<any>;
  private profileRef?: NzDrawerRef<ProfileComponent, any>;

  constructor(
    private wpx: WpxService,
    public app: AppService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private drawer: NzDrawerService
  ) {}

  profile(): void {
    this.profileRef = this.drawer.create<ProfileComponent, { value: string }, string>({
      nzTitle: this.profileTitleTpl,
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
