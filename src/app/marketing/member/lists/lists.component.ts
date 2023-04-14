import { Component, OnInit } from '@angular/core';

import { Member } from '@common/interfaces/member';
import { MembersService } from '@common/services/members.service';
import { AnyDto, WpxData } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent, FormData } from './form/form.component';

@Component({
  selector: 'app-marketing-member-lists',
  templateUrl: './lists.component.html'
})
export class ListsComponent implements OnInit {
  ds: WpxData<AnyDto<Member>> = new WpxData<AnyDto<Member>>();
  searchText = '';

  constructor(private members: MembersService, private modal: NzModalService, private message: NzMessageService) {}

  ngOnInit(): void {
    this.getData(true);
  }

  getData(refresh = false): void {
    this.members.pages(this.ds, refresh).subscribe(() => {});
  }

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

  form(doc?: AnyDto<Member>): void {
    this.modal.create<FormComponent, FormData>({
      nzTitle: !doc ? `创建` : `编辑【${doc.cardno}】`,
      nzContent: FormComponent,
      nzData: {
        doc
      },
      nzOnOk: () => {}
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
}
