import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppService } from '@app';
import { DishType } from '@common/interfaces/dish-type';
import { DishTypesService } from '@common/services/dish-types.service';
import { AnyDto, Filter } from '@weplanx/ng';
import { WpxQuickComponent } from '@weplanx/ng/quick';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { TypeFormComponent, TypeInputData } from './type-form/type-form.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  @ViewChild(WpxQuickComponent, { static: true }) typesRef!: WpxQuickComponent;
  searchText = '';

  typeItems: Array<AnyDto<DishType>> = [];
  typeDict: Record<string, AnyDto<DishType>> = {};

  actionId?: string;

  private changesSubscription!: Subscription;

  constructor(
    public app: AppService,
    public types: DishTypesService,
    private modal: NzModalService,
    private message: NzMessageService,
    private contextMenu: NzContextMenuService
  ) {}

  ngOnInit(): void {
    this.changesSubscription = this.app.changes.subscribe(data => {
      if (data['dishTypes']) {
        this.getTypes();
      }
    });
    this.updateTypes();
  }

  ngOnDestroy(): void {
    this.changesSubscription.unsubscribe();
  }

  getTypes(): void {
    const filter: Filter<DishType> = { shop_id: this.app.shopId };
    if (this.searchText) {
      filter.name = { $regex: this.searchText };
    }
    this.types
      .find(filter, {
        pagesize: 1000,
        xfilter: {
          shop_id: 'oid'
        },
        sort: new Map([['sort', 1]])
      })
      .subscribe(data => {
        this.typeItems = [...data];
        for (const v of data) {
          this.typeDict[v._id] = v;
        }
        this.types.set(this.typeDict);
      });
  }

  private updateTypes(): void {
    this.app.emit({ dishTypes: true });
  }

  sort(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.typeItems, event.previousIndex, event.currentIndex);
    const values = this.typeItems.map(v => v._id);
    this.types.sort('sort', values).subscribe(() => {
      this.message.success($localize`数据更新成功`);
      this.updateTypes();
    });
  }

  actions($event: MouseEvent, menu: NzDropdownMenuComponent, id?: string): void {
    this.actionId = id;
    this.contextMenu.create($event as MouseEvent, menu);
  }

  form(doc: AnyDto<DishType>): void {
    this.modal.create<TypeFormComponent, TypeInputData>({
      nzTitle: `编辑【${doc.name}】`,
      nzContent: TypeFormComponent,
      nzData: {
        shopId: this.app.shopId!,
        doc
      },
      nzOnOk: () => {
        this.updateTypes();
      }
    });
  }

  delete(doc: AnyDto<DishType>): void {
    this.modal.confirm({
      nzTitle: $localize`您确定要删除【${doc.name}】?`,
      nzOkText: $localize`是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzCancelText: $localize`再想想`,
      nzOnOk: () => {
        this.types.delete(doc._id).subscribe(() => {
          this.message.success($localize`数据删除成功`);
          this.updateTypes();
        });
      }
    });
  }
}
