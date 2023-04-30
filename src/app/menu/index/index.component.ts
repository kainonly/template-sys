import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { AppService } from '@app';
import { Dish } from '@common/interfaces/dish';
import { DishType } from '@common/interfaces/dish-type';
import { DishTypesService } from '@common/services/dish-types.service';
import { DishesService } from '@common/services/dishes.service';
import { AnyDto, WpxData } from '@weplanx/ng';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent, InputData } from '../form/form.component';
import { TypesComponent } from '../types/types.component';

@Component({
  selector: 'app-menu-index',
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit, OnDestroy {
  ds: WpxData<AnyDto<Dish>> = new WpxData<AnyDto<Dish>>();
  searchText = '';

  typeDict: Record<string, AnyDto<DishType>> = {};
  typeId!: string | undefined;

  private typesSubscription!: Subscription;

  constructor(
    public app: AppService,
    private route: ActivatedRoute,
    private modal: NzModalService,
    private message: NzMessageService,
    private drawer: NzDrawerService,
    private dishes: DishesService,
    public types: DishTypesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.typeId = data['id'];
      this.ds.filter = {
        shop_id: this.app.shopId,
        type_id: this.typeId
      };
      this.ds.xfilter = {
        shop_id: 'oid',
        type_id: 'oid'
      };
      this.getData(true);
    });
    this.typesSubscription = this.types.dict.subscribe(data => {
      this.typeDict = data;
    });
  }

  ngOnDestroy(): void {
    this.typesSubscription.unsubscribe();
  }

  getData(refresh = false): void {
    this.dishes.pages(this.ds, refresh).subscribe(() => {});
  }

  openTypes(): void {
    this.drawer.create({
      nzWidth: 960,
      nzClosable: false,
      nzContent: TypesComponent
    });
  }

  submitSearch(): void {
    this.ds.filter = {
      shop_id: this.app.shopId,
      type_id: this.typeId
    };
    if (this.searchText) {
      this.ds.filter['$or'] = [
        { name: { $regex: this.searchText } },
        { sn: { $regex: this.searchText } },
        { code: { $regex: this.searchText } }
      ];
    }
    this.getData(true);
  }

  clearSearch(): void {
    this.searchText = '';
    this.getData(true);
  }

  form(doc?: AnyDto<Dish>): void {
    this.modal.create<FormComponent, InputData>({
      nzTitle: !doc ? `创建` : `编辑【${doc.name}】`,
      nzContent: FormComponent,
      nzWidth: 800,
      nzData: {
        shopId: this.app.shopId!,
        typeItems: Object.values(this.typeDict),
        doc
      },
      nzOnOk: () => {
        this.getData(true);
      }
    });
  }

  delete(doc: AnyDto<Dish>): void {
    this.modal.confirm({
      nzTitle: $localize`您确定要删除【${doc.name}】?`,
      nzOkText: $localize`是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzCancelText: $localize`再想想`,
      nzOnOk: () => {
        this.dishes.delete(doc._id).subscribe(() => {
          this.message.success($localize`数据删除成功`);
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
        this.dishes
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
