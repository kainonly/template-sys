import { Component, OnInit } from '@angular/core';

import { Dish } from '@common/interfaces/dish';
import { RestaurantsService } from '@common/services/restaurants.service';
import { AnyDto, WpxData } from '@weplanx/ng';
import { NzModalService } from 'ng-zorro-antd/modal';

import { DishesFormData, FormComponent } from './form/form.component';

@Component({
  selector: 'app-ordering-menu-dishes',
  templateUrl: './dishes.component.html'
})
export class DishesComponent implements OnInit {
  dataset: WpxData<AnyDto<Dish>> = new WpxData<AnyDto<Dish>>();

  constructor(private restaurants: RestaurantsService, private modal: NzModalService) {}

  ngOnInit(): void {}

  getData(refresh = false): void {}

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
