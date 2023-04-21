import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AppService } from '@app';
import { Area } from '@common/interfaces/area';
import { Table } from '@common/interfaces/table';
import { AreasService } from '@common/services/areas.service';
import { TablesService } from '@common/services/tables.service';
import { AnyDto, WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

export interface TableInputData {
  shopId: string;
  areaId?: string;
  doc?: AnyDto<Table>;
}

@Component({
  selector: 'app-overview-area-table-form',
  templateUrl: './table-form.component.html'
})
export class TableFormComponent implements OnInit {
  form!: FormGroup;
  tips: any = {
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
  areaItems: Array<AnyDto<Area>> = [];

  constructor(
    @Inject(NZ_MODAL_DATA) public data: TableInputData,
    public wpx: WpxService,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder,
    private areas: AreasService,
    private tables: TablesService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      area_id: [this.data.areaId, [Validators.required]],
      sn: ['', [Validators.required]],
      alias: [''],
      seats: [0, [Validators.required]],
      minimum_spending: [0],
      runtime: [-1, [Validators.required]]
    });
    this.getAreaItems();
    if (this.data.doc) {
      this.form.patchValue(this.data.doc);
    }
  }

  getAreaItems(): void {
    this.areas
      .find(
        { shop_id: this.data.shopId },
        {
          pagesize: 1000,
          xfilter: { shop_id: 'oid' }
        }
      )
      .subscribe(data => {
        this.areaItems = [...data];
      });
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: any): void {
    if (!this.data.doc) {
      data.shop_id = this.data.shopId;
      this.tables
        .create(data, {
          xdata: {
            shop_id: 'oid',
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
          this.data.doc._id,
          { $set: data },
          {
            xdata: {
              '$set.shop_id': 'oid',
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
