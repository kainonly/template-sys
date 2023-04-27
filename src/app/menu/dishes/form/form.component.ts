import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Dish } from '@common/interfaces/dish';
import { DishType } from '@common/interfaces/dish-type';
import { DishTypesService } from '@common/services/dish-types.service';
import { DishesService } from '@common/services/dishes.service';
import { AnyDto, WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

export interface InputData {
  doc?: AnyDto<Dish>;
}

@Component({
  selector: 'app-menu-dishes-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  tips: any = {
    name: {
      default: {
        required: $localize`菜品名称不能为空`
      }
    }
  };
  formatterPercent = (value: number): string => `${value} %`;

  typeItems: Array<AnyDto<DishType>> = [];

  constructor(
    @Inject(NZ_MODAL_DATA) public data: InputData,
    public wpx: WpxService,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder,
    private dishes: DishesService,
    private types: DishTypesService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      type_id: [null, [Validators.required]],
      name: ['', [Validators.required]],
      sn: [''],
      code: [''],
      signature: [false],
      recommend: [false],
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
      snack: this.fb.group({
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

  getTypes(): void {
    this.types.find({}, { pagesize: 1000 }).subscribe(data => {
      console.log(data);
      this.typeItems = [...data];
    });
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
