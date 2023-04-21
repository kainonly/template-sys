import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppService } from '@app';
import { Area } from '@common/interfaces/area';
import { Table, TableRuntime } from '@common/interfaces/table';
import { AreasService } from '@common/services/areas.service';
import { TablesService } from '@common/services/tables.service';
import { AnyDto } from '@weplanx/ng';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { TableFormComponent, TableInputData } from './table-form/table-form.component';
import { AreaFormComponent, AreaInputData } from '../area-form/area-form.component';

@Component({
  selector: 'app-overview-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {
  shopId!: string;
  area!: AnyDto<Area>;
  searchText = '';
  items: Array<AnyDto<Table>> = [];
  segments = ['全部', '空闲', '就餐', '不清台', '预结账', '停用'];
  segmentIndex = 0;
  runtimeDict: Record<number, TableRuntime> = { 1: -1, 2: 1, 3: 2, 4: 3, 5: -2 };
  runtimeText: Map<TableRuntime, string> = new Map([
    [-2, '停用'],
    [-1, '空闲'],
    [1, '就餐'],
    [2, '不清台'],
    [3, '预结账']
  ]);
  runtimeColor: Map<TableRuntime, string> = new Map([
    [-2, 'grey'],
    [-1, 'blue'],
    [1, 'red'],
    [2, 'orange'],
    [3, 'green']
  ]);
  activated?: AnyDto<Table>;

  constructor(
    private app: AppService,
    private areas: AreasService,
    private tables: TablesService,
    private route: ActivatedRoute,
    private modal: NzModalService,
    private contextMenu: NzContextMenuService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.area = data['area'];
      this.shopId = this.area.shop_id;
      this.getTables();
    });
  }

  getTables(): void {
    let $or: any;
    if (this.searchText) {
      $or = [{ sn: { $regex: this.searchText } }, { alias: { $regex: this.searchText } }];
    }
    let runtime: any;
    if (this.segmentIndex) {
      runtime = this.runtimeDict[this.segmentIndex];
    }
    this.tables
      .find(
        {
          shop_id: this.shopId,
          area_id: this.area!._id,
          runtime,
          $or
        },
        {
          pagesize: 1000,
          xfilter: {
            shop_id: 'oid',
            area_id: 'oid'
          }
        }
      )
      .subscribe(data => {
        this.items = [...data];
      });
  }

  clearSearch(): void {
    this.searchText = '';
    this.segmentIndex = 0;
    this.getTables();
  }

  actions($event: MouseEvent, menu: NzDropdownMenuComponent, data: AnyDto<Table>): void {
    this.activated = data;
    this.contextMenu.create($event, menu);
  }

  form(): void {
    this.modal.create<AreaFormComponent, AreaInputData>({
      nzTitle: `编辑【${this.area!.name}】`,
      nzContent: AreaFormComponent,
      nzData: {
        shopId: this.shopId,
        doc: this.area
      },
      nzOnOk: () => {}
    });
  }

  tableForm(doc?: AnyDto<Table>): void {
    this.modal.create<TableFormComponent, TableInputData>({
      nzTitle: !doc ? `创建` : `编辑【${doc.sn}】`,
      nzContent: TableFormComponent,
      nzData: {
        shopId: this.shopId,
        areaId: this.area!._id,
        doc
      },
      nzOnOk: () => {
        this.getTables();
      }
    });
  }

  tableDelete(doc: AnyDto<Table>): void {
    this.modal.confirm({
      nzTitle: $localize`您确定要删除【${doc.sn}】?`,
      nzOkText: $localize`是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzCancelText: $localize`再想想`,
      nzOnOk: () => {
        this.tables.delete(doc._id).subscribe(() => {
          this.message.success($localize`数据删除成功`);
          this.getTables();
        });
      }
    });
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }
}
