import { Component, OnInit, ViewChild } from '@angular/core';

import { AppService } from '@app';
import { Dish } from '@common/interfaces/dish';
import { DishType } from '@common/interfaces/dish-type';
import { DishTypesService } from '@common/services/dish-types.service';
import { AnyDto, WpxData, XFilter } from '@weplanx/ng';
import { WpxQuickComponent } from '@weplanx/ng/quick';
import { NzModalService } from 'ng-zorro-antd/modal';

import { DishesInputData, FormComponent } from './form/form.component';
import { TypeFormComponent, TypeInputData } from './type-form/type-form.component';

@Component({
  selector: 'app-ordering-menu-dishes',
  templateUrl: './dishes.component.html'
})
export class DishesComponent implements OnInit {
  @ViewChild(WpxQuickComponent, { static: true }) typesRef!: WpxQuickComponent;

  ds: WpxData<AnyDto<Dish>> = new WpxData<AnyDto<Dish>>();

  typeItems: Array<AnyDto<DishType>> = [];
  typeIds: string[] = [];

  constructor(public app: AppService, public types: DishTypesService, private modal: NzModalService) {}

  ngOnInit(): void {}

  getData(refresh = false): void {}

  getTypes(name?: string): void {
    const filter: Record<string, any> = { shop_id: this.app.shopId };
    const xfilter: Record<string, XFilter> = { shop_id: 'oid' };
    if (name) {
      filter['name'] = { $regex: name };
    }
    this.types.find(filter, { pagesize: 1000, xfilter }).subscribe(data => {
      this.typeItems = [...data];
    });
  }

  typeFilter = (ds: WpxData<AnyDto<DishType>>): void => {
    ds.xfilter = { shop_id: 'oid' };
    ds.filter.shop_id = this.app.shopId;
  };

  typeForm = (doc?: AnyDto<DishType>): void => {
    this.modal.create<TypeFormComponent, TypeInputData>({
      nzTitle: !doc ? $localize`新增` : $localize`编辑`,
      nzContent: TypeFormComponent,
      nzData: {
        shopId: this.app.shopId!,
        doc: doc,
        api: this.types
      },
      nzOnOk: () => {
        this.typesRef.getData(true);
        this.getTypes();
      }
    });
  };

  form(doc?: AnyDto<Dish>): void {
    this.modal.create<FormComponent, DishesInputData>({
      nzTitle: !doc ? `创建` : `编辑【${doc.name}】`,
      nzContent: FormComponent,
      nzWidth: 800,
      nzData: {
        doc
      },
      nzOnOk: () => {}
    });
  }
}
