import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { AppService } from '@app';
import { Member } from '@common/interfaces/member';
import { MemberLevel } from '@common/interfaces/member-level';
import { MemberLevelsService } from '@common/services/member-levels.service';
import { MembersService } from '@common/services/members.service';
import { AnyDto, WpxData } from '@weplanx/ng';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent, InputData } from '../form/form.component';
import { LevelsComponent } from '../levels/levels.component';

@Component({
  selector: 'app-membership-index',
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit, OnDestroy {
  ds: WpxData<AnyDto<Member>> = new WpxData<AnyDto<Member>>();
  searchText = '';

  levelDict: Record<string, AnyDto<MemberLevel>> = {};
  levelId: string | undefined;

  private levelsSubscription!: Subscription;

  constructor(
    public app: AppService,
    private modal: NzModalService,
    private message: NzMessageService,
    private drawer: NzDrawerService,
    private route: ActivatedRoute,
    private members: MembersService,
    private levels: MemberLevelsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.levelId = data['id'];
      this.ds.filter = {
        shop_id: this.app.shopId,
        level_id: this.levelId
      };
      this.ds.xfilter = {
        shop_id: 'oid',
        level_id: 'oid'
      };
      this.getData(true);
    });
    this.levelsSubscription = this.levels.dict.subscribe(data => {
      this.levelDict = data;
    });
  }

  ngOnDestroy(): void {
    this.levelsSubscription.unsubscribe();
  }

  getData(refresh = false): void {
    this.ds.filter = {
      shop_id: this.app.shopId,
      level_id: this.levelId
    };
    if (this.searchText) {
      this.ds.filter['$or'] = [
        { cardno: { $regex: this.searchText } },
        { 'profile.name': { $regex: this.searchText } },
        { 'profile.phone': { $regex: this.searchText } }
      ];
    }
    this.members.pages(this.ds, refresh).subscribe(() => {});
  }

  clear(): void {
    this.searchText = '';
    this.getData(true);
  }

  openLevels(): void {
    this.drawer.create({
      nzWidth: 960,
      nzClosable: false,
      nzContent: LevelsComponent
    });
  }

  form(doc?: AnyDto<Member>): void {
    this.modal.create<FormComponent, InputData>({
      nzTitle: !doc ? `创建` : `编辑【${doc.cardno}】`,
      nzContent: FormComponent,
      nzData: {
        shopId: this.app.shopId!,
        doc
      },
      nzOnOk: () => {
        this.getData(true);
      }
    });
  }

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

  bulkDelete(): void {
    this.modal.confirm({
      nzTitle: $localize`您确认要删除这些吗?`,
      nzOkText: $localize`是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.members
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
