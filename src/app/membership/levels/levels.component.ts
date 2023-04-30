import { Component, OnInit } from '@angular/core';

import { AppService } from '@app';
import { MemberLevel } from '@common/interfaces/member-level';
import { MemberLevelsService } from '@common/services/member-levels.service';
import { AnyDto, WpxData } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { LevelFormComponent, LevelInputData } from '../level-form/level-form.component';

@Component({
  selector: 'app-membership-levels',
  templateUrl: './levels.component.html'
})
export class LevelsComponent implements OnInit {
  ds: WpxData<AnyDto<MemberLevel>> = new WpxData<AnyDto<MemberLevel>>();
  searchText = '';

  constructor(
    public app: AppService,
    private levels: MemberLevelsService,
    private modal: NzModalService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.ds.filter = {
      shop_id: this.app.shopId
    };
    this.ds.xfilter = {
      shop_id: 'oid'
    };
    this.ds.sort = new Map([['weights', 1]]);
    this.getData(true);
  }

  getData(refresh = false): void {
    this.levels.pages(this.ds, refresh).subscribe(() => {});
  }

  submitSearch(): void {
    this.ds.filter = {
      shop_id: this.app.shopId
    };
    if (this.searchText) {
      this.ds.filter.name = { $regex: this.searchText };
    }
    this.getData(true);
  }

  clearSearch(): void {
    this.searchText = '';
    this.getData(true);
  }

  private updateLevels(): void {
    this.app.emit({ memberLevels: true });
  }

  form(doc?: AnyDto<MemberLevel>): void {
    this.modal.create<LevelFormComponent, LevelInputData>({
      nzTitle: !doc ? `创建` : `编辑【${doc.name}】`,
      nzContent: LevelFormComponent,
      nzData: {
        shopId: this.app.shopId!,
        doc
      },
      nzOnOk: () => {
        this.getData(true);
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
          this.getData(true);
          this.updateLevels();
        });
      }
    });
  }

  bulkDelete(): void {
    this.modal.confirm({
      nzTitle: $localize`您确认要删除这些吗?`,
      nzOkText: $localize`是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.levels
          .bulkDelete(
            { _id: { $in: [...this.ds.checkedIds.values()] } },
            {
              xfilter: { '_id.$in': 'oids' }
            }
          )
          .subscribe(() => {
            this.message.success($localize`数据删除成功`);
            this.ds.checkedIds.clear();
            this.ds.updateCheckedStatus();
            this.getData(true);
          });
      },
      nzCancelText: $localize`否`
    });
  }
}
