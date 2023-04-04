import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Area } from '@common/interfaces/area';
import { AnyDto, WpxData } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { AreaFormComponent } from '../../area-form/area-form.component';
import { AreasService } from '../../areas.service';
import { OutlineService } from '../../outline.service';

@Component({
  selector: 'app-restaurants-restaurant-areas',
  templateUrl: './areas.component.html'
})
export class AreasComponent implements OnInit, OnDestroy {
  restaurantId!: string;
  searchText = '';
  dataset: WpxData<AnyDto<Area>> = new WpxData<AnyDto<Area>>();

  private areaSubscription!: Subscription;

  constructor(
    private areas: AreasService,
    private outline: OutlineService,
    private route: ActivatedRoute,
    private modal: NzModalService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.route.parent!.params.subscribe(params => {
      this.restaurantId = params['id'] as string;
      this.dataset.filter = { restaurant_id: this.restaurantId };
      this.dataset.xfilter = { restaurant_id: 'oid' };
      this.getData(true);
    });
    this.areaSubscription = this.outline.area$.subscribe(id => {
      if (id && id === this.restaurantId) {
        this.getData(true);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.areaSubscription) {
      this.areaSubscription.unsubscribe();
    }
  }

  getData(refresh = false): void {
    this.areas.pages(this.dataset, refresh).subscribe(() => {});
  }

  submitSearch(): void {
    if (!this.searchText) {
      this.dataset.filter = { restaurant_id: this.restaurantId };
    } else {
      this.dataset.filter = {
        restaurant_id: this.restaurantId,
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
    this.modal.create({
      nzTitle: !doc ? `创建` : `编辑【${doc.name}】`,
      nzContent: AreaFormComponent,
      nzComponentParams: {
        restaurantId: this.restaurantId,
        doc
      },
      nzOnOk: () => {
        this.outline.area$.next(this.restaurantId);
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
          this.outline.area$.next(this.restaurantId);
        });
      }
    });
  }
}
