import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
          nz-tooltip="概况"
          i18n-nz-tooltip
          nzTooltipPlacement="right"
          nzMatchRouter
          [routerLink]="['/', shopId, 'overview']"
        >
          <span nz-icon nzType="desktop"></span>
        </li>
        <li
          nz-menu-item
          nz-tooltip="点餐"
          i18n-nz-tooltip
          nzTooltipPlacement="right"
          nzMatchRouter
          [routerLink]="['/', shopId, 'ordering']"
        >
          <span nz-icon nzType="coffee"></span>
        </li>
        <li
          nz-menu-item
          nz-tooltip="资源"
          i18n-nz-tooltip
          nzTooltipPlacement="right"
          nzMatchRouter
          [routerLink]="['/', shopId, 'resources']"
        >
          <span nz-icon nzType="inbox"></span>
        </li>
        <li
          nz-menu-item
          nz-tooltip="营销"
          i18n-nz-tooltip
          nzTooltipPlacement="right"
          nzMatchRouter
          [routerLink]="['/', shopId, 'marketing']"
        >
          <span nz-icon nzType="bulb"></span>
        </li>
      </ul>
    </nav>

    <router-outlet></router-outlet>
  `
})
export class IndexComponent implements OnInit {
  shopId!: string;

  constructor(
    public app: AppService,
    private shops: ShopsService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.app.index = this.route;
    this.app.shop.subscribe(data => {
      this.shopId = data._id;
      this.cd.detectChanges();
    });
  }
}
