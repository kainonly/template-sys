import { Component, OnInit } from '@angular/core';

import { AppService } from '@app';
import { Reason } from '@common/interfaces/reason';
import { ReasonsService } from '@common/services/reasons.service';
import { AnyDto, WpxData } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { categories } from './categories';
import { FormComponent, InputData } from './form/form.component';

@Component({
  selector: 'app-home-other-reasons',
  templateUrl: './reasons.component.html'
})
export class ReasonsComponent implements OnInit {
  ds: WpxData<AnyDto<Reason>> = new WpxData<AnyDto<Reason>>();
  searchText = '';

  category = 0;
  categoryMap = categories;

  constructor(
    public app: AppService,
    private reasons: ReasonsService,
    private modal: NzModalService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getData(true);
  }

  getData(refresh = false): void {
    this.ds.filter = { shop_id: this.app.shopId };
    if (this.category) {
      this.ds.filter.category = this.category;
    }
    if (this.searchText) {
      this.ds.filter['$or'] = [{ sn: { $regex: this.searchText } }, { content: { $regex: this.searchText } }];
    }
    this.ds.xfilter = { shop_id: 'oid' };
    this.reasons.pages(this.ds, refresh).subscribe(() => {});
  }

  clear(): void {
    this.category = 0;
    this.searchText = '';
    this.getData(true);
  }

  form(doc?: AnyDto<Reason>): void {
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

  delete(doc: AnyDto<Reason>): void {
    this.modal.confirm({
      nzTitle: $localize`您确定要删除【${doc.sn}】?`,
      nzOkText: $localize`是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzCancelText: $localize`再想想`,
      nzOnOk: () => {
        this.reasons.delete(doc._id).subscribe(() => {
          this.message.success($localize`数据删除成功`);
        });
      }
    });
  }
}
