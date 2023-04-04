import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { Area, AreaDict, RestaurantAreas } from '@common/interfaces/area';
import { Restaurant, RestaurantDict } from '@common/interfaces/restaurant';
import { RestaurantsService } from '@common/services/restaurants.service';
import { AnyDto } from '@weplanx/ng';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzFormatEmitEvent, NzTreeComponent, NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/tree';

import { AreaFormComponent } from './area-form/area-form.component';
import { AreasService } from './areas.service';
import { FormComponent } from './form/form.component';
import { OutlineService } from './outline.service';
import { OutlineStatus } from './types';

@Component({
  selector: 'app-restaurants-outline',
  templateUrl: './outline.component.html',
  styleUrls: ['./outline.component.scss']
})
export class OutlineComponent implements OnInit, OnDestroy {
  @Input() id?: string;
  @Input() areaId?: string;
  @Output() readonly status: EventEmitter<OutlineStatus | undefined> = new EventEmitter();
  @ViewChild('tree') tree?: NzTreeComponent;

  nodes: NzTreeNodeOptions[] = [];
  keys: string[] = [];
  searchText = '';
  restaurantDict: RestaurantDict = {};
  restaurantAreas: RestaurantAreas = {};
  areaDict: AreaDict = {};
  activated?: NzTreeNode;

  private selectedSubscription!: Subscription;
  private restaurantSubscription!: Subscription;
  private areaSubscription!: Subscription;

  constructor(
    private restaurants: RestaurantsService,
    private outline: OutlineService,
    private areas: AreasService,
    private contextMenu: NzContextMenuService,
    private modal: NzModalService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getRestaurants();
    this.selectedSubscription = this.outline.selected$.subscribe(key => {
      this.keys = [key];
    });
    this.restaurantSubscription = this.outline.restaurant$.subscribe(id => {
      this.getRestaurants();
    });
    this.areaSubscription = this.outline.area$.subscribe(id => {
      this.getAreas(id);
    });
  }

  ngOnDestroy(): void {
    if (this.selectedSubscription) {
      this.selectedSubscription.unsubscribe();
    }
    if (this.restaurantSubscription) {
      this.restaurantSubscription.unsubscribe();
    }
    if (this.areaSubscription) {
      this.areaSubscription.unsubscribe();
    }
  }

  getRestaurants(): void {
    this.restaurants.find({}, { pagesize: 1000 }).subscribe(data => {
      this.restaurantDict = {};
      this.nodes = [
        ...data.map<NzTreeNodeOptions>(v => {
          this.restaurantDict[v._id] = v;
          return { title: v.name, key: v._id, expanded: v._id === this.id, type: 'restaurant' };
        })
      ];
      this.restaurants.set(this.restaurantDict);
      if (this.id) {
        this.outline.area$.next(this.id);
        if (!this.areaId) {
          this.outline.selected$.next(this.id);
        }
      }
    });
  }

  getAreas(restaurantId: string): void {
    this.areas
      .find(
        {
          restaurant_id: restaurantId
        },
        {
          pagesize: 1000,
          xfilter: {
            restaurant_id: 'oid'
          }
        }
      )
      .subscribe(data => {
        const node = this.tree!.getTreeNodeByKey(restaurantId)!;
        if (this.restaurantAreas[restaurantId]) {
          node.clearChildren();
          this.restaurantAreas[restaurantId].forEach(v => {
            delete this.areaDict[v._id];
          });
        }
        node.addChildren([
          ...data.map(v => {
            this.areaDict[v._id] = v;
            return { title: v.name, key: v._id, restaurantId: v.restaurant_id, type: 'area' };
          })
        ]);
        this.restaurantAreas[restaurantId] = [...data];
        this.areas.set(this.areaDict);
        if (this.areaId) {
          this.outline.selected$.next(this.areaId);
        }
      });
  }

  expanded($event: MouseEvent, node: NzTreeNode): void {
    $event.stopPropagation();
    node.isExpanded = !node.isExpanded;
    if (node.isExpanded && !this.restaurantAreas[node.key]) {
      this.outline.area$.next(node.key);
    }
  }

  select($event: NzFormatEmitEvent): void {
    if (!$event.node) {
      return;
    }
    const node = $event.node;
    if (node.isSelected) {
      this.id = node.key;
      switch (node.origin['type']) {
        case 'restaurant':
          this.status.next({
            id: node.key,
            type: node.origin['type']
          });
          break;
        case 'area':
          this.status.next({
            id: node.origin['restaurantId'],
            type: node.origin['type'],
            areaId: node.key
          });
          break;
      }
    } else {
      this.id = undefined;
      this.status.next(undefined);
    }
  }

  actions($event: NzFormatEmitEvent, menu: NzDropdownMenuComponent): void {
    this.activated = $event.node!;
    this.contextMenu.create($event.event as MouseEvent, menu);
  }

  form(doc?: AnyDto<Restaurant>): void {
    this.modal.create({
      nzTitle: !doc ? `创建` : `编辑【${doc.name}】`,
      nzContent: FormComponent,
      nzWidth: 640,
      nzComponentParams: {
        doc
      },
      nzOnOk: () => {
        this.getRestaurants();
      }
    });
  }

  delete(doc: AnyDto<Restaurant>): void {
    this.modal.confirm({
      nzTitle: $localize`您确定要删除【${doc.name}】?`,
      nzOkText: $localize`是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzCancelText: $localize`再想想`,
      nzOnOk: () => {
        this.restaurants.delete(doc._id).subscribe(() => {
          this.message.success($localize`数据删除成功`);
          this.getRestaurants();
          this.id = undefined;
          this.status.next(undefined);
        });
      }
    });
  }

  areaForm(restaurantId: string, doc?: AnyDto<Area>): void {
    this.modal.create({
      nzTitle: !doc ? `创建` : `编辑【${doc.name}】`,
      nzContent: AreaFormComponent,
      nzComponentParams: {
        restaurantId,
        doc
      },
      nzOnOk: () => {
        this.outline.area$.next(restaurantId);
      }
    });
  }

  deleteArea(doc: AnyDto<Area>): void {
    this.modal.confirm({
      nzTitle: $localize`您确定要删除【${doc.name}】?`,
      nzOkText: $localize`是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzCancelText: $localize`再想想`,
      nzOnOk: () => {
        this.areas.delete(doc._id).subscribe(() => {
          this.message.success($localize`数据删除成功`);
          this.outline.area$.next(doc.restaurant_id);
        });
      }
    });
  }
}
