import { Component, OnInit } from '@angular/core';

import { Shop } from '@common/interfaces/shop';
import { ShopsService } from '@common/services/shops.service';
import { AnyDto, WpxData } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent, InputData } from './form/form.component';

@Component({
  selector: 'app-settings-basis-shops',
  templateUrl: './shops.component.html'
})
export class ShopsComponent implements OnInit {
  searchText = '';
  ds: WpxData<AnyDto<Shop>> = new WpxData<AnyDto<Shop>>();

  constructor(private shops: ShopsService, private modal: NzModalService, private message: NzMessageService) {}

  ngOnInit(): void {
    this.getData(true);
  }

  getData(refresh = false): void {
    this.shops.pages(this.ds, refresh).subscribe(() => {});
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

  form(doc?: AnyDto<Shop>): void {
    this.modal.create<FormComponent, InputData>({
      nzTitle: !doc ? `创建` : `编辑【${doc.name}】`,
      nzContent: FormComponent,
      nzWidth: 640,
      nzData: {
        doc
      },
      nzOnOk: () => {
        this.getData(true);
      }
    });
  }

  delete(doc: AnyDto<Shop>): void {
    this.modal.confirm({
      nzTitle: $localize`您确定要删除【${doc.name}】?`,
      nzOkText: $localize`是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzCancelText: $localize`再想想`,
      nzOnOk: () => {
        this.shops.delete(doc._id).subscribe(() => {
          this.message.success($localize`数据删除成功`);
        });
      }
    });
  }
}