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
  selector: 'app-home-overview-areas',
  templateUrl: './areas.component.html'
})
export class AreasComponent implements OnInit, OnDestroy {
  ds: WpxData<AnyDto<Area>> = new WpxData<AnyDto<Area>>();
  searchText = '';

  private changesSubscription!: Subscription;
  private areaSubscription!: Subscription;

  constructor(
    private app: AppService,
    private areas: AreasService,
    private route: ActivatedRoute,
    private modal: NzModalService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getData(true);
    this.changesSubscription = this.app.changes.subscribe(data => {
      if (data['shopId'] || data['areas']) {
        this.getData(true);
      }
    });
  }

  ngOnDestroy(): void {
    this.changesSubscription.unsubscribe();
    this.areaSubscription?.unsubscribe();
  }

  getData(refresh = false): void {
    this.ds.filter = { shop_id: this.app.shopId };
    this.ds.xfilter = { shop_id: 'oid' };
    this.ds.sort = new Map([['sort', 1]]);
    this.areas.pages(this.ds, refresh).subscribe(() => {});
  }

  private updateAreas(): void {
    this.app.emit({ areas: true });
  }

  submitSearch(): void {
    if (!this.searchText) {
      this.ds.filter = { shop_id: this.app.shopId };
    } else {
      this.ds.filter = {
        shop_id: this.app.shopId,
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
        shopId: this.app.shopId!,
        doc
      },
      nzOnOk: () => {
        this.updateAreas();
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
          this.updateAreas();
        });
      }
    });
  }
}
