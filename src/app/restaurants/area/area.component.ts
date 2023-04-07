import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Area } from '@common/interfaces/area';
import { Restaurant } from '@common/interfaces/restaurant';
import { Table, TableRuntime } from '@common/interfaces/table';
import { RestaurantsService } from '@common/services/restaurants.service';
import { AnyDto } from '@weplanx/ng';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { AreaFormComponent, AreaFormData } from '../area-form/area-form.component';
import { AreasService } from '../areas.service';
import { OutlineService } from '../outline.service';
import { TableFormComponent, TableFormData } from '../table-form/table-form.component';
import { TableService } from '../table.service';

@Component({
  selector: 'app-restaurants-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {
  restaurant?: AnyDto<Restaurant>;
  area?: AnyDto<Area>;
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
    private restaurants: RestaurantsService,
    private areas: AreasService,
    private outline: OutlineService,
    private tables: TableService,
    private route: ActivatedRoute,
    private modal: NzModalService,
    private contextMenu: NzContextMenuService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(switchMap(params => combineLatest([this.restaurants.get(params['id']), this.areas.get(params['areaId'])])))
      .subscribe(data => {
        this.restaurant = data[0];
        this.area = data[1];
        if (this.restaurant && this.area) {
          this.getTables();
        }
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
          restaurant_id: this.restaurant!._id,
          area_id: this.area!._id,
          runtime,
          $or
        },
        {
          pagesize: 1000,
          xfilter: {
            restaurant_id: 'oid',
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
    this.modal.create<AreaFormComponent, AreaFormData>({
      nzTitle: `编辑【${this.area!.name}】`,
      nzContent: AreaFormComponent,
      nzData: {
        restaurantId: this.restaurant!._id,
        doc: this.area
      },
      nzOnOk: () => {
        this.outline.area$.next(this.restaurant!._id);
      }
    });
  }

  tableForm(doc?: AnyDto<Table>): void {
    this.modal.create<TableFormComponent, TableFormData>({
      nzTitle: !doc ? `创建` : `编辑【${doc.sn}】`,
      nzContent: TableFormComponent,
      nzData: {
        restaurantId: this.restaurant!._id,
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
