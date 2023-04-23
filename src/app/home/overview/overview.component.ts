import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppService } from '@app';
import { ShopFormComponent, ShopInputData } from '@common/components/shop-form/shop-form.component';
import { Shop } from '@common/interfaces/shop';
import { ShopsService } from '@common/services/shops.service';
import { AnyDto, WpxService } from '@weplanx/ng';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTabSetComponent } from 'ng-zorro-antd/tabs';

@Component({
  selector: 'app-home-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {
  @ViewChild(NzTabSetComponent) tabset!: NzTabSetComponent;
  shop?: AnyDto<Shop>;

  private changesSubscription?: Subscription;

  constructor(
    public app: AppService,
    public wpx: WpxService,
    private shops: ShopsService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.getShop();
    this.changesSubscription = this.app.changes.subscribe(data => {
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

  form(): void {
    this.modal.create<ShopFormComponent, ShopInputData>({
      nzTitle: `编辑【${this.shop!.name}】`,
      nzContent: ShopFormComponent,
      nzWidth: 640,
      nzData: {
        doc: this.shop
      },
      nzOnOk: () => {
        this.app.changes.next({ shopId: this.shop!._id });
      }
    });
  }
}
