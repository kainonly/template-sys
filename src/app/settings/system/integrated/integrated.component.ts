import { Component } from '@angular/core';

@Component({
  selector: 'app-settings-system-integrated',
  template: `
    <nz-page-header [nzGhost]="false">
      <nz-page-header-title>集成功能</nz-page-header-title>
      <nz-page-header-footer>
        <nz-tabset nzLinkRouter>
          <nz-tab>
            <a *nzTabLink nz-tab-link [routerLink]="['/settings', 'system', 'integrated', 'cloud']"> 云平台 </a>
          </nz-tab>
          <nz-tab>
            <a *nzTabLink nz-tab-link [routerLink]="['/settings', 'system', 'integrated', 'security']"> 安全策略 </a>
          </nz-tab>
          <nz-tab>
            <a *nzTabLink nz-tab-link [routerLink]="['/settings', 'system', 'integrated', 'extend']"> 扩展服务 </a>
          </nz-tab>
        </nz-tabset>
      </nz-page-header-footer>
    </nz-page-header>

    <nz-content style="padding: 6px">
      <router-outlet></router-outlet>
    </nz-content>
  `
})
export class IntegratedComponent {}
