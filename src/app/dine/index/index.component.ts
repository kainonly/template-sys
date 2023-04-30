import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { AppService } from '@app';
import { Area } from '@common/interfaces/area';
import { Table, TableRuntime } from '@common/interfaces/table';
import { AreasService } from '@common/services/areas.service';
import { TablesService } from '@common/services/tables.service';
import { AnyDto, Filter } from '@weplanx/ng';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { AreasComponent } from '../areas/areas.component';
import { TableFormComponent, TableInputData } from '../table-form/table-form.component';

@Component({
  selector: 'app-dine-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {
  items: Array<AnyDto<Table>> = [];
  searchText = '';

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

  areaDict: Record<string, AnyDto<Area>> = {};
  areaId: string | undefined;

  actionData?: AnyDto<Table>;

  private areasSubscription!: Subscription;

  constructor(
    public app: AppService,
    private areas: AreasService,
    private tables: TablesService,
    private route: ActivatedRoute,
    private modal: NzModalService,
    private contextMenu: NzContextMenuService,
    private message: NzMessageService,
    private drawer: NzDrawerService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.areaId = data['id'];
      this.getData();
    });
    this.areasSubscription = this.areas.dict.subscribe(data => {
      this.areaDict = data;
    });
  }

  ngOnDestroy(): void {
    this.areasSubscription.unsubscribe();
  }

  openAreas(): void {
    this.drawer.create({
      nzWidth: 960,
      nzClosable: false,
      nzContent: AreasComponent
    });
  }

  getData(): void {
    const filter: Filter<Table> = { shop_id: this.app.shopId! };
    if (this.areaId) {
      filter.area_id = this.areaId;
    }
    if (this.searchText) {
      filter['$or'] = [{ sn: { $regex: this.searchText } }, { alias: { $regex: this.searchText } }];
    }
    if (this.segmentIndex) {
      filter.runtime = this.runtimeDict[this.segmentIndex];
    }
    this.tables
      .find(filter, {
        pagesize: 1000,
        xfilter: {
          shop_id: 'oid',
          area_id: 'oid'
        }
      })
      .subscribe(data => {
        this.items = [...data];
      });
  }

  clear(): void {
    this.searchText = '';
    this.segmentIndex = 0;
    this.getData();
  }

  actions($event: MouseEvent, menu: NzDropdownMenuComponent, data: AnyDto<Table>): void {
    this.actionData = data;
    this.contextMenu.create($event, menu);
  }

  form(doc?: AnyDto<Table>): void {
    this.modal.create<TableFormComponent, TableInputData>({
      nzTitle: !doc ? `创建` : `编辑【${doc.sn}】`,
      nzContent: TableFormComponent,
      nzData: {
        shopId: this.app.shopId!,
        areaId: this.areaId,
        doc
      },
      nzOnOk: () => {
        this.getData();
      }
    });
  }

  delete(doc: AnyDto<Table>): void {
    this.modal.confirm({
      nzTitle: $localize`您确定要删除【${doc.sn}】?`,
      nzOkText: $localize`是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzCancelText: $localize`再想想`,
      nzOnOk: () => {
        this.tables.delete(doc._id).subscribe(() => {
          this.message.success($localize`数据删除成功`);
          this.getData();
        });
      }
    });
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }
}
