import { Component, OnInit } from '@angular/core';

import { MemberBenefit } from '@common/interfaces/member-benefit';
import { MemberBenefitsService } from '@common/services/member-benefits.service';
import { AnyDto, WpxData } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent, FormData } from './form/form.component';

@Component({
  selector: 'app-marketing-member-benefits',
  templateUrl: './benefits.component.html'
})
export class BenefitsComponent implements OnInit {
  ds: WpxData<AnyDto<MemberBenefit>> = new WpxData<AnyDto<MemberBenefit>>();
  searchText = '';

  constructor(
    private benefits: MemberBenefitsService,
    private modal: NzModalService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getData(true);
  }

  getData(refresh = false): void {
    this.benefits.pages(this.ds, refresh).subscribe(() => {});
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

  form(doc?: AnyDto<MemberBenefit>): void {
    this.modal.create<FormComponent, FormData>({
      nzTitle: !doc ? `创建` : `编辑【${doc.name}】`,
      nzContent: FormComponent,
      nzData: {
        doc
      },
      nzOnOk: () => {}
    });
  }

  delete(doc: AnyDto<MemberBenefit>): void {
    this.modal.confirm({
      nzTitle: $localize`您确定要删除【${doc.name}】?`,
      nzOkText: $localize`是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzCancelText: $localize`再想想`,
      nzOnOk: () => {
        this.benefits.delete(doc._id).subscribe(() => {
          this.message.success($localize`数据删除成功`);
        });
      }
    });
  }
}
