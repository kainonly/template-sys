import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppService } from '@app';
import { Area, AreaDict } from '@common/interfaces/area';
import { AreasService } from '@common/services/areas.service';
import { AnyDto } from '@weplanx/ng';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { AreaFormComponent, AreaInputData } from './area-form/area-form.component';

@Component({
  selector: 'app-dine',
  templateUrl: './dine.component.html',
  styleUrls: ['./dine.component.scss']
})
export class DineComponent implements OnInit, OnDestroy {
  searchText = '';

  areaItems: Array<AnyDto<Area>> = [];
  areaDict: AreaDict = {};

  actionId?: string;

  private changesSubscription!: Subscription;

  constructor(
    public app: AppService,
    public areas: AreasService,
    private modal: NzModalService,
    private message: NzMessageService,
    private contextMenu: NzContextMenuService
  ) {}

  ngOnInit(): void {
    this.getAreas();
    this.changesSubscription = this.app.changes.subscribe(data => {
      if (data['areas']) {
        this.getAreas();
      }
    });
  }

  ngOnDestroy(): void {
    this.changesSubscription.unsubscribe();
  }

  getAreas(): void {
    this.areas
      .find(
        { shop_id: this.app.shopId },
        {
          pagesize: 1000,
          xfilter: { shop_id: 'oid' },
          sort: new Map([['sort', 1]])
        }
      )
      .subscribe(data => {
        this.areaItems = [...data];
        for (const v of data) {
          this.areaDict[v._id] = v;
        }
        this.areas.set(this.areaDict);
      });
  }

  private updateAreas(): void {
    this.app.emit({ areas: true });
  }

  sort(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.areaItems, event.previousIndex, event.currentIndex);
    const values = this.areaItems.map(v => v._id);
    this.areas.sort('sort', values).subscribe(() => {
      this.message.success($localize`数据更新成功`);
      this.updateAreas();
    });
  }

  actions($event: MouseEvent, menu: NzDropdownMenuComponent, id?: string): void {
    this.actionId = id;
    this.contextMenu.create($event as MouseEvent, menu);
  }

  form(doc: AnyDto<Area>): void {
    this.modal.create<AreaFormComponent, AreaInputData>({
      nzTitle: !doc ? `创建` : `编辑【${doc.name}】`,
      nzContent: AreaFormComponent,
      nzData: {
        shopId: this.app.shopId!,
        doc
      },
      nzOnOk: () => {
        this.updateAreas();
      }
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
          this.updateAreas();
        });
      }
    });
  }
}
