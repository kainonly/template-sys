import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Restaurant } from '@common/interfaces/restaurant';
import { RestaurantsService } from '@common/services/restaurants.service';
import { AnyDto } from '@weplanx/ng';
import { WpxStoreService } from '@weplanx/ng/store';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent, FormData } from '../form/form.component';
import { OutlineService } from '../outline.service';

@Component({
  selector: 'app-restaurants-index',
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit {
  searchText = '';
  items: Array<AnyDto<Restaurant>> = [];
  segments = ['全部', '启用', '禁用'];
  segmentIndex = 0;
  bannerVisible = false;
  activated?: AnyDto<Restaurant>;

  constructor(
    private restaurants: RestaurantsService,
    private outline: OutlineService,
    private router: Router,
    private modal: NzModalService,
    private storage: WpxStoreService,
    private contextMenu: NzContextMenuService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.storage.get<boolean>('restaurants-index:banner').subscribe(data => {
      this.bannerVisible = data ?? true;
    });
    this.getRestaurants();
  }

  getRestaurants(): void {
    this.restaurants.values().subscribe(data => {
      this.items = [
        ...data.filter(v => {
          let search = true;
          if (this.searchText) {
            search = v.name.includes(this.searchText);
          }
          let status = true;
          if (this.segmentIndex) {
            status = this.segmentIndex === 1;
          }
          return search && status;
        })
      ];
    });
  }

  refresh(): void {
    this.outline.restaurant$.next(undefined);
  }

  clearSearch(): void {
    this.searchText = '';
    this.segmentIndex = 0;
    this.getRestaurants();
  }

  hideBanner(): void {
    this.bannerVisible = false;
    this.storage.set('restaurants-index:banner', this.bannerVisible);
  }

  navigate(id: string): void {
    this.outline.selected$.next(id);
    this.router.navigate(['/_', 'restaurants', id]);
  }

  actions($event: MouseEvent, menu: NzDropdownMenuComponent, data: AnyDto<Restaurant>): void {
    this.activated = data;
    this.contextMenu.create($event, menu);
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
        this.outline.restaurant$.next(doc?._id);
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
          this.outline.restaurant$.next(undefined);
        });
      }
    });
  }
}
