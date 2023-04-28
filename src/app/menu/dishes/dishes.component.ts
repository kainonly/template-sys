import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppService } from '@app';
import { Dish } from '@common/interfaces/dish';
import { DishType } from '@common/interfaces/dish-type';
import { DishTypesService } from '@common/services/dish-types.service';
import { DishesService } from '@common/services/dishes.service';
import { AnyDto, WpxData } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent, InputData } from './form/form.component';

@Component({
  selector: 'app-menu-dishes',
  templateUrl: './dishes.component.html'
})
export class DishesComponent implements OnInit {
  ds: WpxData<AnyDto<Dish>> = new WpxData<AnyDto<Dish>>();

  typeDict: Record<string, AnyDto<DishType>> = {};
  private typeId?: string;

  constructor(
    public app: AppService,
    private route: ActivatedRoute,
    private modal: NzModalService,
    private message: NzMessageService,
    private dishes: DishesService,
    private types: DishTypesService
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
      this.getTypes();
      this.getData(true);
    });
  }

  getData(refresh = false): void {
    this.dishes.pages(this.ds, refresh).subscribe(() => {});
  }

  getTypes(): void {
    this.types
      .find(
        {
          shop_id: this.app.shopId
        },
        {
          xfilter: {
            shop_id: 'oid'
          }
        }
      )
      .subscribe(data => {
        for (const v of data) {
          this.typeDict[v._id] = v;
        }
      });
  }

  form(doc?: AnyDto<Dish>): void {
    this.modal.create<FormComponent, InputData>({
      nzTitle: !doc ? `创建` : `编辑【${doc.name}】`,
      nzContent: FormComponent,
      nzWidth: 800,
      nzData: {
        shopId: this.app.shopId!,
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
}
