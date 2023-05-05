import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppService } from '@app';
import { MemberLevel, MemberLevelDict } from '@common/interfaces/member-level';
import { MemberLevelsService } from '@common/services/member-levels.service';
import { AnyDto, Filter } from '@weplanx/ng';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { LevelFormComponent, LevelInputData } from './level-form/level-form.component';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.scss']
})
export class MembershipComponent implements OnInit, OnDestroy {
  searchText = '';
  actionId?: string;

  levelItems: Array<AnyDto<MemberLevel>> = [];
  levelDict: MemberLevelDict = {};

  private changesSubscription!: Subscription;

  constructor(
    public app: AppService,
    public levels: MemberLevelsService,
    private modal: NzModalService,
    private message: NzMessageService,
    private contextMenu: NzContextMenuService
  ) {}

  ngOnInit(): void {
    this.getLevels();
    this.changesSubscription = this.app.changes.subscribe(data => {
      if (data['memberLevels']) {
        this.getLevels();
      }
    });
  }

  ngOnDestroy(): void {
    this.changesSubscription.unsubscribe();
  }

  getLevels(): void {
    const filter: Filter<MemberLevel> = { shop_id: this.app.shopId };
    if (this.searchText) {
      filter.name = { $regex: this.searchText };
    }
    this.levels
      .find(filter, {
        pagesize: 1000,
        xfilter: { shop_id: 'oid' },
        sort: new Map([['weights', 1]])
      })
      .subscribe(data => {
        this.levelItems = [...data];
        for (const v of data) {
          this.levelDict[v._id] = v;
        }
        this.levels.set(this.levelDict);
      });
  }

  actions($event: MouseEvent, menu: NzDropdownMenuComponent, id?: string): void {
    this.actionId = id;
    this.contextMenu.create($event as MouseEvent, menu);
  }

  sort(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.levelItems, event.previousIndex, event.currentIndex);
    const values = this.levelItems.map(v => v._id);
    this.levels.sort('weights', values).subscribe(() => {
      this.message.success($localize`数据更新成功`);
    });
  }

  form(doc: AnyDto<MemberLevel>): void {
    this.modal.create<LevelFormComponent, LevelInputData>({
      nzTitle: `编辑【${doc.name}】`,
      nzContent: LevelFormComponent,
      nzData: {
        shopId: this.app.shopId!,
        doc
      },
      nzOnOk: () => {
        this.getLevels();
      }
    });
  }

  delete(doc: AnyDto<MemberLevel>): void {
    this.modal.confirm({
      nzTitle: $localize`您确定要删除【${doc.name}】?`,
      nzOkText: $localize`是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzCancelText: $localize`再想想`,
      nzOnOk: () => {
        this.levels.delete(doc._id).subscribe(() => {
          this.message.success($localize`数据删除成功`);
          this.getLevels();
        });
      }
    });
  }
}
