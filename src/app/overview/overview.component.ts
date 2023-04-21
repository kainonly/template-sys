import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

import { AppService } from '@app';
import { Area, AreaDict } from '@common/interfaces/area';
import { Shop } from '@common/interfaces/shop';
import { AreasService } from '@common/services/areas.service';
import { AnyDto } from '@weplanx/ng';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { AreaFormComponent, AreaInputData } from './area-form/area-form.component';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  shop!: AnyDto<Shop>;
  shopId!: string;
  searchText = '';
  areaItems: Array<AnyDto<Area>> = [];
  areaDict: AreaDict = {};

  actionId?: string;

  constructor(
    public app: AppService,
    private areas: AreasService,
    private modal: NzModalService,
    private contextMenu: NzContextMenuService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.app.shop.subscribe(data => {
      this.shop = data;
      this.shopId = this.shop._id;
      this.getData();
    });
  }

  getData(): void {
    this.areas
      .find(
        {
          shop_id: this.shopId
        },
        {
          pagesize: 1000,
          xfilter: {
            shop_id: 'oid'
          }
        }
      )
      .subscribe(data => {
        this.areaItems = [...data];
        for (const v of data) {
          this.areaDict[v._id] = v;
        }
      });
  }

  sort(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.areaItems, event.previousIndex, event.currentIndex);
  }

  actions($event: MouseEvent, menu: NzDropdownMenuComponent, id?: string): void {
    this.actionId = id;
    this.contextMenu.create($event as MouseEvent, menu);
  }

  form(doc?: AnyDto<Area>): void {
    this.modal.create<AreaFormComponent, AreaInputData>({
      nzTitle: !doc ? `创建` : `编辑【${doc.name}】`,
      nzContent: AreaFormComponent,
      nzData: {
        shopId: this.shopId,
        doc
      },
      nzOnOk: () => {}
    });
  }

  delete(doc: AnyDto<Area>): void {
    this.modal.confirm({
      nzTitle: $localize`您确定要删除【${doc.name}】?`,
      nzOkText: $localize`是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzCancelText: $localize`再想想`,
      nzOnOk: () => {
        this.areas.delete(doc._id).subscribe(() => {
          this.message.success($localize`数据删除成功`);
        });
      }
    });
  }
}
