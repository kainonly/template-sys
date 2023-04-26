import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';

import { AppService } from '@app';
import { MemberLevel } from '@common/interfaces/member-level';
import { MemberLevelsService } from '@common/services/member-levels.service';
import { AnyDto, XFilter } from '@weplanx/ng';
import { WpxQuickComponent } from '@weplanx/ng/quick';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { LevelFormComponent, LevelInputData } from './level-form/level-form.component';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.scss']
})
export class MembershipComponent implements OnInit {
  @ViewChild(WpxQuickComponent, { static: true }) levelsRef!: WpxQuickComponent;
  searchText = '';

  levelItems: Array<AnyDto<MemberLevel>> = [];
  levelDict: Record<string, AnyDto<MemberLevel>> = {};

  actionId?: string;

  constructor(
    public app: AppService,
    public levels: MemberLevelsService,
    private modal: NzModalService,
    private message: NzMessageService,
    private contextMenu: NzContextMenuService
  ) {}

  ngOnInit(): void {
    this.getLevels();
  }

  getLevels(name?: string): void {
    const filter: Record<string, any> = { shop_id: this.app.shopId };
    const xfilter: Record<string, XFilter> = { shop_id: 'oid' };
    if (name) {
      filter['name'] = { $regex: name };
    }
    this.levels
      .find(filter, {
        pagesize: 1000,
        xfilter,
        sort: new Map([['weights', -1]])
      })
      .subscribe(data => {
        this.levelItems = [...data];
        for (const v of data) {
          this.levelDict[v._id] = v;
        }
      });
  }

  private updateLevels(): void {
    this.app.emit({ memberLevels: true });
  }

  sort(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.levelItems, event.previousIndex, event.currentIndex);
    const values = this.levelItems.map(v => v._id).reverse();
    this.levels.sort('weights', values).subscribe(() => {
      this.message.success($localize`数据更新成功`);
      this.updateLevels();
    });
  }

  actions($event: MouseEvent, menu: NzDropdownMenuComponent, id?: string): void {
    this.actionId = id;
    this.contextMenu.create($event as MouseEvent, menu);
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
        this.message.success($localize`数据更新成功`);
        this.updateLevels();
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
          this.updateLevels();
        });
      }
    });
  }
}
