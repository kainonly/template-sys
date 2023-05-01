import { Component, OnInit } from '@angular/core';

import { AppService } from '@app';
import { Remark } from '@common/interfaces/remark';
import { RemarksService } from '@common/services/remarks.service';
import { AnyDto, WpxData } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent, InputData } from './form/form.component';

@Component({
  selector: 'app-home-other-remarks',
  templateUrl: './remarks.component.html'
})
export class RemarksComponent implements OnInit {
  searchText = '';

  ds: WpxData<AnyDto<Remark>> = new WpxData<AnyDto<Remark>>();

  constructor(
    public app: AppService,
    private remarks: RemarksService,
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
    this.getData(true);
  }

  getData(refresh = false): void {
    this.remarks.pages(this.ds, refresh).subscribe(() => {});
  }

  submitSearch(): void {
    this.ds.filter = {
      shop_id: this.app.shopId
    };
    if (this.searchText) {
      this.ds.filter['$or'] = [
        {
          sn: { $regex: this.searchText }
        },
        {
          content: { $regex: this.searchText }
        }
      ];
    }
    this.getData(true);
  }

  clearSearch(): void {
    this.searchText = '';
    this.getData(true);
  }

  form(doc?: AnyDto<Remark>): void {
    this.modal.create<FormComponent, InputData>({
      nzTitle: !doc ? `创建` : `编辑【${doc.sn}】`,
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

  delete(doc: AnyDto<Remark>): void {
    this.modal.confirm({
      nzTitle: $localize`您确定要删除【${doc.sn}】?`,
      nzOkText: $localize`是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzCancelText: $localize`再想想`,
      nzOnOk: () => {
        this.remarks.delete(doc._id).subscribe(() => {
          this.message.success($localize`数据删除成功`);
        });
      }
    });
  }
}
