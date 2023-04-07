import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Dish } from '@common/interfaces/dish';
import { DishesService } from '@common/services/dishes.service';
import { AnyDto, WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

export interface DishesFormData {
  doc?: AnyDto<Dish>;
}

@Component({
  selector: 'app-ordering-menu-dishes-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  tips: any = {
    sn: {
      default: {
        required: $localize`菜品编码不能为空`
      }
    },
    name: {
      default: {
        required: $localize`菜品名称不能为空`
      }
    }
  };

  formatterPercent = (value: number): string => `${value} %`;
  tags: Array<{ label: string; value: number }> = [
    { label: '折', value: 1 },
    { label: '荐', value: 2 },
    { label: '热', value: 3 }
  ];

  constructor(
    @Inject(NZ_MODAL_DATA) public data: DishesFormData,
    public wpx: WpxService,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder,
    private dishes: DishesService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      sn: ['', [Validators.required]],
      name: ['', [Validators.required]],
      pinyin: [''],
      signature: [false],
      cold: [false],
      tags: [[]],
      price: [0],
      vip: this.fb.group({
        enabled: [false],
        price: [0]
      }),
      weigh: [false],
      by_time: [false],
      cost: [0],
      commission: [0],
      discount: [false],
      minimum_quantity: [0],
      dine: this.fb.group({
        enabled: [false],
        service: [0],
        tax: [0]
      }),
      takeout: this.fb.group({
        enabled: [false],
        service: [0],
        tax: [0]
      }),
      preorder: this.fb.group({
        enabled: [false],
        way: [1],
        quantity: [0]
      }),
      logo: [],
      introduction: [],
      status: [true, [Validators.required]]
    });
    if (this.data.doc) {
      this.form.patchValue(this.data.doc);
    }
  }

  get vipEnabled(): FormControl {
    return this.form.get('vip')!.get('enabled') as FormControl;
  }

  get preorderEnabled(): FormControl {
    return this.form.get('preorder')!.get('enabled') as FormControl;
  }

  get preorderWay(): FormControl {
    return this.form.get('preorder')!.get('way') as FormControl;
  }

  get dineEnabled(): FormControl {
    return this.form.get('dine')!.get('enabled') as FormControl;
  }

  get takeoutEnabled(): FormControl {
    return this.form.get('takeout')!.get('enabled') as FormControl;
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: any): void {
    if (!this.data.doc) {
      this.dishes.create(data).subscribe(() => {
        this.message.success($localize`数据更新成功`);
        this.modalRef.triggerOk();
      });
    } else {
      this.dishes.updateById(this.data.doc._id, { $set: data }).subscribe(() => {
        this.message.success($localize`数据更新成功`);
        this.modalRef.triggerOk();
      });
    }
  }
}
