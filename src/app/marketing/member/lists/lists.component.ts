import { Component, OnInit, ViewChild } from '@angular/core';

import { DishType } from '@common/interfaces/dish-type';
import { Member } from '@common/interfaces/member';
import { MemberLevelsService } from '@common/services/member-levels.service';
import { MembersService } from '@common/services/members.service';
import { AnyDto, WpxData } from '@weplanx/ng';
import { WpxQuickComponent, WpxQuickFormData } from '@weplanx/ng/quick';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { LevelFormComponent } from './level-form/level-form.component';

@Component({
  selector: 'app-marketing-member-lists',
  templateUrl: './lists.component.html'
})
export class ListsComponent implements OnInit {
  @ViewChild(WpxQuickComponent, { static: true }) levelsRef!: WpxQuickComponent;
  ds: WpxData<AnyDto<Member>> = new WpxData<AnyDto<Member>>();
  searchText = '';

  constructor(
    private members: MembersService,
    public levels: MemberLevelsService,
    private modal: NzModalService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getData(true);
  }

  getData(refresh = false): void {
    this.members.pages(this.ds, refresh).subscribe(() => {});
  }

  getLevels(): void {}

  submitSearch(): void {
    if (!this.searchText) {
      this.ds.filter = {};
    } else {
      this.ds.filter = {
        name: { $regex: this.searchText }
      };
    }
    this.getData(true);
  }

  clearSearch(): void {
    this.searchText = '';
    this.getData(true);
  }

  levelForm = (doc?: AnyDto<DishType>): void => {
    this.modal.create<LevelFormComponent, WpxQuickFormData>({
      nzTitle: !doc ? $localize`新增` : $localize`编辑`,
      nzContent: LevelFormComponent,
      nzData: {
        doc: doc,
        api: this.levels
      },
      nzOnOk: () => {
        this.levelsRef.getData(true);
        this.getLevels();
      }
    });
  };

  delete(doc: AnyDto<Member>): void {
    this.modal.confirm({
      nzTitle: $localize`您确定要删除【${doc.cardno}】?`,
      nzOkText: $localize`是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzCancelText: $localize`再想想`,
      nzOnOk: () => {
        this.members.delete(doc._id).subscribe(() => {
          this.message.success($localize`数据删除成功`);
        });
      }
    });
  }
}
