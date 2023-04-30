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
          nz-tooltip="工作台"
          i18n-nz-tooltip
          nzTooltipPlacement="right"
          nzMatchRouter
          [routerLink]="['/', app.shopId, 'home']"
        >
          <span nz-icon nzType="desktop"></span>
        </li>
        <li
          nz-menu-item
          nz-tooltip="堂食"
          i18n-nz-tooltip
          nzTooltipPlacement="right"
          nzMatchRouter
          [routerLink]="['/', app.shopId, 'dine']"
        >
          <span nz-icon nzType="partition"></span>
        </li>
        <li
          nz-menu-item
          nz-tooltip="菜谱"
          i18n-nz-tooltip
          nzTooltipPlacement="right"
          nzMatchRouter
          [routerLink]="['/', app.shopId, 'menu']"
        >
          <span nz-icon nzType="coffee"></span>
        </li>
        <li
          nz-menu-item
          nz-tooltip="会员"
          i18n-nz-tooltip
          nzTooltipPlacement="right"
          nzMatchRouter
          [routerLink]="['/', app.shopId, 'membership']"
        >
          <span nz-icon nzType="contacts"></span>
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
          nz-tooltip="统计"
          i18n-nz-tooltip
          nzTooltipPlacement="right"
          nzMatchRouter
          [routerLink]="['/', app.shopId, 'statistics']"
        >
          <span nz-icon nzType="line-chart"></span>
        </li>
      </ul>
    </nav>

    <router-outlet></router-outlet>
  `
})
export class IndexComponent implements OnInit, OnDestroy {
  constructor(
    public app: AppService,
    private shops: ShopsService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.app.shopId = data['id'];
      this.app.changes.next({ shopId: this.app.shopId });
      this.cd.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.app.shopId = undefined;
    this.app.changes.next({ shopId: undefined });
  }
}
