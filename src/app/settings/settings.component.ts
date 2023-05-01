import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  template: `
    <nz-layout class="common-layout" style="padding-left: 0">
      <nz-sider class="nav" nzWidth="240px" nzTheme="light">
        <ul nz-menu>
          <li nz-menu-group nzTitle="基础" i18n-nzTitle>
            <ul>
              <li nz-menu-item nzMatchRouter [routerLink]="['/', 'settings', 'basis', 'shops']">
                <span nz-icon nzType="shop"></span>
                <span i18n>门店管理</span>
              </li>
              <li nz-menu-item nzMatchRouter [routerLink]="['/', 'settings', 'basis', 'users']">
                <span nz-icon nzType="team"></span>
                <span i18n>店长管理</span>
              </li>
            </ul>
          </li>
          <li nz-menu-group nzTitle="系统" i18n-nzTitle>
            <ul>
              <li nz-menu-item nzMatchRouter [routerLink]="['/', 'settings', 'system', 'integrated']">
                <span nz-icon nzType="appstore-add"></span>
                <span i18n>集成功能</span>
              </li>
              <li nz-menu-item nzMatchRouter [routerLink]="['/', 'settings', 'system', 'sessions']">
                <span nz-icon nzType="rocket"></span>
                <span i18n>在线会话</span>
              </li>
              <li nz-menu-item nzMatchRouter [routerLink]="['/', 'settings', 'system', 'values']">
                <span nz-icon nzType="control"></span>
                <span i18n>动态配置</span>
              </li>
            </ul>
          </li>
          <li nz-menu-group nzTitle="审计" i18n-nzTitle>
            <ul>
              <li nz-menu-item nzMatchRouter [routerLink]="['/', 'settings', 'audit', 'login_logs']">
                <span nz-icon nzType="audit"></span>
                <span i18n>登录日志</span>
              </li>
              <li nz-menu-item nzMatchRouter [routerLink]="['/', 'settings', 'audit', 'access_logs']">
                <span nz-icon nzType="history"></span>
                <span i18n>访问日志</span>
              </li>
            </ul>
          </li>
        </ul>
      </nz-sider>

      <nz-layout>
        <nz-content>
          <router-outlet></router-outlet>
        </nz-content>
      </nz-layout>
    </nz-layout>
  `
})
export class SettingsComponent {}
