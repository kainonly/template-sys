import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Area } from '@common/interfaces/area';
import { Restaurant } from '@common/interfaces/restaurant';
import { RestaurantsService } from '@common/services/restaurants.service';
import { AnyDto, WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

import { AreasService } from '../areas.service';

export interface AreaFormData {
  restaurantId?: string;
  doc?: AnyDto<Area>;
}

@Component({
  selector: 'app-restaurants-area-form',
  templateUrl: './area-form.component.html'
})
export class AreaFormComponent implements OnInit {
  form!: FormGroup;
  tips: any = {
    restaurant: {
      default: {
        required: $localize`所属餐厅不能为空`
      }
    },
    name: {
      default: {
        required: $localize`区位名称不能为空`
      }
    }
  };
  restaurantItems: Array<AnyDto<Restaurant>> = [];

  constructor(
    @Inject(NZ_MODAL_DATA) public data: AreaFormData,
    public wpx: WpxService,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder,
    private areas: AreasService,
    private restaurants: RestaurantsService
  ) {}

  ngOnInit(): void {
    this.restaurants.values().subscribe(data => {
      this.restaurantItems = [...data];
    });
    this.form = this.fb.group({
      restaurant_id: [this.data.restaurantId, [Validators.required]],
      name: ['', [Validators.required]],
      tea: this.fb.group({
        fee: [0.0],
        service: [0],
        tax: [0]
      }),
      status: [true, [Validators.required]]
    });
    if (this.data.doc) {
      this.form.patchValue(this.data.doc);
    }
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: any): void {
    if (!this.data.doc) {
      data.restaurant_id = this.data.restaurantId;
      this.areas
        .create(data, {
          xdata: {
            restaurant_id: 'oid'
          }
        })
        .subscribe(() => {
          this.message.success($localize`数据更新成功`);
          this.modalRef.triggerOk();
        });
    } else {
      this.areas
        .updateById(
          this.data.doc._id,
          { $set: data },
          {
            xdata: {
              '$set.restaurant_id': 'oid'
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
