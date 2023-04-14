import { Component, OnInit, ViewChild } from '@angular/core';

import { Dish } from '@common/interfaces/dish';
import { DishType } from '@common/interfaces/dish-type';
import { Restaurant } from '@common/interfaces/restaurant';
import { DishTypesService } from '@common/services/dish-types.service';
import { RestaurantsService } from '@common/services/restaurants.service';
import { AnyDto, WpxData, XFilter } from '@weplanx/ng';
import { WpxQuickComponent } from '@weplanx/ng/quick';
import { NzModalService } from 'ng-zorro-antd/modal';

import { DishesFormData, FormComponent } from './form/form.component';
import { TypeFormComponent, TypeFormData } from './type-form/type-form.component';

@Component({
  selector: 'app-ordering-menu-dishes',
  templateUrl: './dishes.component.html'
})
export class DishesComponent implements OnInit {
  @ViewChild(WpxQuickComponent, { static: true }) typesRef!: WpxQuickComponent;

  ds: WpxData<AnyDto<Dish>> = new WpxData<AnyDto<Dish>>();

  restaurantItems: Array<AnyDto<Restaurant>> = [];
  restaurantId = '';

  typeItems: Array<AnyDto<DishType>> = [];
  typeIds: string[] = [];

  constructor(private restaurants: RestaurantsService, public types: DishTypesService, private modal: NzModalService) {}

  ngOnInit(): void {
    this.restaurants.getItems().subscribe(data => {
      this.restaurantItems = [...data];
      if (!this.restaurantId) {
        this.restaurantId = this.restaurantItems[0]._id;
      }
    });
  }

  restaurantChange(): void {
    this.getData(true);
  }

  getData(refresh = false): void {}

  getTypes(name?: string): void {
    const filter: Record<string, any> = { restaurant_id: this.restaurantId };
    const xfilter: Record<string, XFilter> = { restaurant_id: 'oid' };
    if (name) {
      filter['name'] = { $regex: name };
    }
    this.types.find(filter, { pagesize: 1000, xfilter }).subscribe(data => {
      this.typeItems = [...data];
    });
  }

  typeFilter = (ds: WpxData<AnyDto<DishType>>): void => {
    ds.xfilter = { restaurant_id: 'oid' };
    ds.filter.restaurant_id = this.restaurantId;
  };

  typeForm = (doc?: AnyDto<DishType>): void => {
    this.modal.create<TypeFormComponent, TypeFormData>({
      nzTitle: !doc ? $localize`新增` : $localize`编辑`,
      nzContent: TypeFormComponent,
      nzData: {
        restaurant_id: this.restaurantId,
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
    this.modal.create<FormComponent, DishesFormData>({
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
