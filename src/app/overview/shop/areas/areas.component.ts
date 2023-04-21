import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { AppService } from '@app';
import { Area } from '@common/interfaces/area';
import { AreasService } from '@common/services/areas.service';
import { AnyDto, WpxData } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { AreaFormComponent, AreaInputData } from '../../area-form/area-form.component';

@Component({
  selector: 'app-overview-shop-areas',
  templateUrl: './areas.component.html'
})
export class AreasComponent implements OnInit, OnDestroy {
  shopId!: string;

  ds: WpxData<AnyDto<Area>> = new WpxData<AnyDto<Area>>();
  searchText = '';

  private areaSubscription!: Subscription;

  constructor(
    private app: AppService,
    private areas: AreasService,
    private route: ActivatedRoute,
    private modal: NzModalService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.app.shop.subscribe(data => {
      this.shopId = data._id;
      this.ds.filter = { shop_id: this.shopId };
      this.ds.xfilter = { shop_id: 'oid' };
      this.getData(true);
    });
  }

  ngOnDestroy(): void {
    if (this.areaSubscription) {
      this.areaSubscription.unsubscribe();
    }
  }

  getData(refresh = false): void {
    this.areas.pages(this.ds, refresh).subscribe(() => {});
  }

  submitSearch(): void {
    if (!this.searchText) {
      this.ds.filter = { shop_id: this.shopId };
    } else {
      this.ds.filter = {
        shop_id: this.shopId,
        name: { $regex: this.searchText }
      };
    }
    this.getData(true);
  }

  clearSearch(): void {
    this.searchText = '';
    this.getData(true);
  }

  form(doc?: AnyDto<Area>): void {
    this.modal.create<AreaFormComponent, AreaInputData>({
      nzTitle: !doc ? `创建` : `编辑【${doc.name}】`,
      nzContent: AreaFormComponent,
      nzData: {
        shopId: this.shopId,
        doc
      },
      nzOnOk: () => {
        // this.outline.area$.next(this.restaurantId);
      }
    });
  }

  delete(doc: AnyDto<Area>): void {
    this.modal.confirm({
      nzTitle: $localize`您确定要删除【${doc.name}】?`,
      nzOkText: $localize`是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzCancelText: $localize`再想想`,
      nzOnOk: () => {
        this.areas.delete(doc._id).subscribe(() => {
          this.message.success($localize`数据删除成功`);
          // this.outline.area$.next(this.restaurantId);
        });
      }
    });
  }
}
