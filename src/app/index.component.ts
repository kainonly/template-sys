import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppService } from '@app';
import { ShopsService } from '@common/services/shops.service';

@Component({
  selector: 'app-index',
  template: `
    <nav class="toolbar">
      <ul nz-menu nzMode="vertical">
        <li
          nz-menu-item
          nz-tooltip="仪表盘"
          i18n-nz-tooltip
          nzTooltipPlacement="right"
          nzMatchRouter
          [routerLink]="['/', app.shopId, 'dashboard']"
        >
          <span nz-icon nzType="dashboard"></span>
        </li>
        <li
          nz-menu-item
          nz-tooltip="门店"
          i18n-nz-tooltip
          nzTooltipPlacement="right"
          nzMatchRouter
          [routerLink]="['/', app.shopId, 'overview']"
        >
          <span nz-icon nzType="shop"></span>
        </li>
        <li
          nz-menu-item
          nz-tooltip="点餐"
          i18n-nz-tooltip
          nzTooltipPlacement="right"
          nzMatchRouter
          [routerLink]="['/', app.shopId, 'ordering']"
        >
          <span nz-icon nzType="coffee"></span>
        </li>
        <li
          nz-menu-item
          nz-tooltip="资源"
          i18n-nz-tooltip
          nzTooltipPlacement="right"
          nzMatchRouter
          [routerLink]="['/', app.shopId, 'resources']"
        >
          <span nz-icon nzType="inbox"></span>
        </li>
        <li
          nz-menu-item
          nz-tooltip="营销"
          i18n-nz-tooltip
          nzTooltipPlacement="right"
          nzMatchRouter
          [routerLink]="['/', app.shopId, 'marketing']"
        >
          <span nz-icon nzType="bulb"></span>
        </li>
      </ul>
    </nav>

    <router-outlet></router-outlet>
  `
})
export class IndexComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    public app: AppService,
    private shops: ShopsService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.app.shop = data['shop'];
      this.cd.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.app.shop = undefined;
  }
}
