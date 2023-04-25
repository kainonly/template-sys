import { Component, OnInit } from '@angular/core';

import { Dish } from '@common/interfaces/dish';
import { DishesService } from '@common/services/dishes.service';
import { AnyDto, WpxData } from '@weplanx/ng';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent, InputData } from './form/form.component';

@Component({
  selector: 'app-menu-dishes',
  templateUrl: './dishes.component.html'
})
export class DishesComponent implements OnInit {
  ds: WpxData<AnyDto<Dish>> = new WpxData<AnyDto<Dish>>();

  constructor(private dishes: DishesService, private modal: NzModalService) {}

  ngOnInit(): void {
    this.getData(true);
  }

  getData(refresh = false): void {
    this.dishes.pages(this.ds, refresh).subscribe(() => {});
  }

  form(doc?: AnyDto<Dish>): void {
    this.modal.create<FormComponent, InputData>({
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
