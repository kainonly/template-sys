import { Component } from '@angular/core';

@Component({
  selector: 'app-index',
  template: `
    <nav class="toolbar">
      <ul nz-menu nzMode="vertical">
        <li
          nz-menu-item
          nz-tooltip="总览"
          i18n-nz-tooltip
          nzTooltipPlacement="right"
          nzMatchRouter
          [routerLink]="['/', '_', 'overview']"
        >
          <span nz-icon nzType="desktop"></span>
        </li>
        <li
          nz-menu-item
          nz-tooltip="餐厅"
          i18n-nz-tooltip
          nzTooltipPlacement="right"
          nzMatchRouter
          [routerLink]="['/', '_', 'restaurants']"
        >
          <span nz-icon nzType="shop"></span>
        </li>
        <li
          nz-menu-item
          nz-tooltip="点餐"
          i18n-nz-tooltip
          nzTooltipPlacement="right"
          nzMatchRouter
          [routerLink]="['/', '_', 'ordering']"
        >
          <span nz-icon nzType="coffee"></span>
        </li>
        <li
          nz-menu-item
          nz-tooltip="资源"
          i18n-nz-tooltip
          nzTooltipPlacement="right"
          nzMatchRouter
          [routerLink]="['/', '_', 'resources']"
        >
          <span nz-icon nzType="inbox"></span>
        </li>
        <li
          nz-menu-item
          nz-tooltip="营销"
          i18n-nz-tooltip
          nzTooltipPlacement="right"
          nzMatchRouter
          [routerLink]="['/', '_', 'marketing']"
        >
          <span nz-icon nzType="bulb"></span>
        </li>
      </ul>
    </nav>

    <router-outlet></router-outlet>
  `
})
export class IndexComponent {}
