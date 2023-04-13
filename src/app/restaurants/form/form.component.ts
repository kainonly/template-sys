import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Restaurant } from '@common/interfaces/restaurant';
import { RestaurantsService } from '@common/services/restaurants.service';
import { AnyDto, WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

export interface FormData {
  doc?: AnyDto<Restaurant>;
}

@Component({
  selector: 'app-restaurants-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  tips: any = {
    name: {
      default: {
        required: $localize`餐厅名称不能为空`
      }
    },
    code: {
      default: {
        required: $localize`餐厅编码不能为空`
      }
    },
    tel: {
      default: {
        required: $localize`餐厅服务电话不能为空`
      }
    }
  };

  constructor(
    @Inject(NZ_MODAL_DATA) public data: FormData,
    public wpx: WpxService,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder,
    private restaurants: RestaurantsService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      sn: ['', [Validators.required]],
      tel: ['', [Validators.required]],
      location: [''],
      description: [''],
      enabled: this.fb.group({
        minimum_spending: [false],
        mini_wechatpay: [false],
        tea: [false]
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
      this.restaurants.create(data).subscribe(() => {
        this.message.success($localize`数据更新成功`);
        this.modalRef.triggerOk();
      });
    } else {
      this.restaurants.updateById(this.data.doc._id, { $set: data }).subscribe(() => {
        this.message.success($localize`数据更新成功`);
        this.modalRef.triggerOk();
      });
    }
  }
}
