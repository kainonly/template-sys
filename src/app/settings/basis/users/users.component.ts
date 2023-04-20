import { Component, OnInit } from '@angular/core';

import { User } from '@common/interfaces/user';
import { UsersService } from '@common/services/users.service';
import { AnyDto, WpxData, WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent, InputData } from './form/form.component';

@Component({
  selector: 'app-settings-basis-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  searchText = '';
  ds: WpxData<AnyDto<User>> = new WpxData<AnyDto<User>>();

  constructor(
    public users: UsersService,
    private wpx: WpxService,
    private modal: NzModalService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getData(true);
  }

  getData(refresh = false): void {
    this.users.pages(this.ds, refresh).subscribe(() => {});
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

  form(doc?: AnyDto<User>): void {
    this.modal.create<FormComponent, InputData>({
      nzTitle: !doc ? '创建' : `编辑【${doc.email}】`,
      nzWidth: 640,
      nzContent: FormComponent,
      nzData: {
        doc
      },
      nzOnOk: () => {
        this.getData(true);
      }
    });
  }

  delete(doc: AnyDto<User>): void {
    this.modal.confirm({
      nzTitle: $localize`您确定要删除【${doc.email}】?`,
      nzOkText: $localize`是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.users.delete(doc._id).subscribe(() => {
          this.message.success($localize`数据删除成功`);
          this.getData(true);
        });
      },
      nzCancelText: $localize`再想想`
    });
  }
}
