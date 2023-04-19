import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Restaurant } from '@common/interfaces/restaurant';
import { RestaurantsService } from '@common/services/restaurants.service';
import { AnyDto, WpxData } from '@weplanx/ng';
import { WpxStoreService } from '@weplanx/ng/store';
import { NzContextMenuService } from 'ng-zorro-antd/dropdown';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent, FormData } from '../../../restaurants/form/form.component';

@Component({
  selector: 'app-settings-basis-shops',
  templateUrl: './shops.component.html'
})
export class ShopsComponent implements OnInit {
  searchText = '';
  dataset: WpxData<AnyDto<Restaurant>> = new WpxData<AnyDto<Restaurant>>();

  constructor(
    private restaurants: RestaurantsService,
    private router: Router,
    private modal: NzModalService,
    private storage: WpxStoreService,
    private contextMenu: NzContextMenuService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getData(true);
  }

  getData(refresh = false): void {
    this.restaurants.pages(this.dataset, refresh).subscribe(() => {});
  }

  submitSearch(): void {
    if (!this.searchText) {
      this.dataset.filter = {};
    } else {
      this.dataset.filter = {
        name: { $regex: this.searchText }
      };
    }
    this.getData(true);
  }

  clearSearch(): void {
    this.searchText = '';
    this.getData(true);
  }

  form(doc?: AnyDto<Restaurant>): void {
    this.modal.create<FormComponent, FormData>({
      nzTitle: !doc ? `创建` : `编辑【${doc.name}】`,
      nzContent: FormComponent,
      nzWidth: 640,
      nzData: {
        doc
      },
      nzOnOk: () => {
        // this.outline.restaurant$.next(doc?._id);
      }
    });
  }

  delete(doc: AnyDto<Restaurant>): void {
    this.modal.confirm({
      nzTitle: $localize`您确定要删除【${doc.name}】?`,
      nzOkText: $localize`是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzCancelText: $localize`再想想`,
      nzOnOk: () => {
        this.restaurants.delete(doc._id).subscribe(() => {
          this.message.success($localize`数据删除成功`);
        });
      }
    });
  }
}
