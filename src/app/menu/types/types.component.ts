import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppService } from '@app';
import { DishType } from '@common/interfaces/dish-type';
import { DishTypesService } from '@common/services/dish-types.service';
import { AnyDto, WpxData } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { TypeFormComponent, TypeInputData } from '../type-form/type-form.component';

@Component({
  selector: 'app-menu-types',
  templateUrl: './types.component.html'
})
export class TypesComponent implements OnInit, OnDestroy {
  ds: WpxData<AnyDto<DishType>> = new WpxData<AnyDto<DishType>>();
  searchText = '';

  private changesSubscription!: Subscription;

  constructor(
    private app: AppService,
    public types: DishTypesService,
    private modal: NzModalService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.ds.filter = { shop_id: this.app.shopId };
    this.ds.xfilter = { shop_id: 'oid' };
    this.ds.sort = new Map([['sort', 1]]);
    this.getData(true);
    this.changesSubscription = this.app.changes.subscribe(data => {
      if (data['dishTypes']) {
        this.getData(true);
      }
    });
  }

  ngOnDestroy(): void {
    this.changesSubscription.unsubscribe();
  }

  getData(refresh = false): void {
    this.ds.filter = { shop_id: this.app.shopId };
    if (this.searchText) {
      this.ds.filter.name = { $regex: this.searchText };
    }
    this.types.pages(this.ds, refresh).subscribe(() => {});
  }

  clear(): void {
    this.searchText = '';
    this.getData(true);
  }

  private updateTypes(): void {
    this.app.emit({ dishTypes: true });
  }

  form(doc?: AnyDto<DishType>): void {
    this.modal.create<TypeFormComponent, TypeInputData>({
      nzTitle: !doc ? `创建` : `编辑【${doc.name}】`,
      nzContent: TypeFormComponent,
      nzData: {
        shopId: this.app.shopId!,
        doc
      },
      nzOnOk: () => {
        this.updateTypes();
      }
    });
  }

  delete(doc: AnyDto<DishType>): void {
    this.modal.confirm({
      nzTitle: $localize`您确定要删除【${doc.name}】?`,
      nzOkText: $localize`是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzCancelText: $localize`再想想`,
      nzOnOk: () => {
        this.types.delete(doc._id).subscribe(() => {
          this.message.success($localize`数据删除成功`);
          this.updateTypes();
        });
      }
    });
  }

  bulkDelete(): void {
    this.modal.confirm({
      nzTitle: $localize`您确认要删除这些吗?`,
      nzOkText: $localize`是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.types
          .bulkDelete(
            { _id: { $in: [...this.ds.checkedIds.values()] } },
            {
              xfilter: { '_id.$in': 'oids' }
            }
          )
          .subscribe(() => {
            this.message.success($localize`数据删除成功`);
            this.ds.checkedIds.clear();
            this.ds.updateCheckedStatus();
            this.getData(true);
          });
      },
      nzCancelText: $localize`否`
    });
  }
}
