import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Area } from '@common/interfaces/area';
import { Restaurant } from '@common/interfaces/restaurant';
import { Table } from '@common/interfaces/table';
import { RestaurantsService } from '@common/services/restaurants.service';
import { AnyDto, WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

import { AreasService } from '../areas.service';
import { TableService } from '../table.service';

@Component({
  selector: 'app-restaurants-table-form',
  templateUrl: './table-form.component.html'
})
export class TableFormComponent implements OnInit {
  @Input() restaurantId?: string;
  @Input() areaId?: string;
  @Input() doc?: AnyDto<Table>;

  tips = {
    restaurant: {
      default: {
        required: $localize`所属餐厅不能为空`
      }
    },
    area: {
      default: {
        required: $localize`所属区位不能为空`
      }
    },
    sn: {
      default: {
        required: $localize`桌号不能为空`
      }
    },
    seats: {
      default: {
        required: $localize`餐位不能为空`
      }
    }
  };
  form!: FormGroup;
  restaurantItems: Array<AnyDto<Restaurant>> = [];
  areaItems: Array<AnyDto<Area>> = [];

  constructor(
    public wpx: WpxService,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder,
    private areas: AreasService,
    private restaurants: RestaurantsService,
    private tables: TableService
  ) {}

  ngOnInit(): void {
    this.restaurants.values().subscribe(data => {
      this.restaurantItems = [...data];
    });
    this.getAreaItems(this.restaurantId!);
    this.form = this.fb.group({
      restaurant_id: [this.restaurantId, [Validators.required]],
      area_id: [this.areaId, [Validators.required]],
      sn: ['', [Validators.required]],
      alias: [''],
      seats: [0, [Validators.required]],
      minimum_spending: [0],
      runtime: [-1, [Validators.required]]
    });
    if (this.doc) {
      this.form.patchValue(this.doc);
    }
  }

  resetRestaurant(restaurantId: string): void {
    this.getAreaItems(restaurantId);
    this.form.get('area_id')?.reset();
  }

  getAreaItems(restaurantId: string): void {
    this.areas.values().subscribe(data => {
      this.areaItems = [...data.filter(v => v.restaurant_id === restaurantId)];
    });
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: any): void {
    if (!this.doc) {
      data.restaurant_id = this.restaurantId;
      this.tables
        .create(data, {
          xdata: {
            restaurant_id: 'oid',
            area_id: 'oid'
          }
        })
        .subscribe(() => {
          this.message.success($localize`数据更新成功`);
          this.modalRef.triggerOk();
        });
    } else {
      this.tables
        .updateById(
          this.doc._id,
          { $set: data },
          {
            xdata: {
              '$set.restaurant_id': 'oid',
              '$set.area_id': 'oid'
            }
          }
        )
        .subscribe(() => {
          this.message.success($localize`数据更新成功`);
          this.modalRef.triggerOk();
        });
    }
  }
}
