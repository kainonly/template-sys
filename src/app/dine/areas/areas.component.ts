import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppService } from '@app';
import { Area } from '@common/interfaces/area';
import { AreasService } from '@common/services/areas.service';
import { AnyDto, WpxData } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { AreaFormComponent, AreaInputData } from '../area-form/area-form.component';

@Component({
  selector: 'app-dine-areas',
  templateUrl: './areas.component.html'
})
export class AreasComponent implements OnInit {
  ds: WpxData<AnyDto<Area>> = new WpxData<AnyDto<Area>>();
  searchText = '';

  constructor(
    private app: AppService,
    private areas: AreasService,
    private route: ActivatedRoute,
    private modal: NzModalService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getData(true);
  }

  getData(refresh = false): void {
    this.ds.filter = { shop_id: this.app.shopId };
    this.ds.xfilter = { shop_id: 'oid' };
    if (this.searchText) {
      this.ds.filter.name = { $regex: this.searchText };
    }
    this.ds.sort = new Map([['sort', 1]]);
    this.areas.pages(this.ds, refresh).subscribe(() => {});
  }

  private update(): void {
    this.app.emit({ areas: true });
  }

  clear(): void {
    this.searchText = '';
    this.getData(true);
  }

  form(doc?: AnyDto<Area>): void {
    this.modal.create<AreaFormComponent, AreaInputData>({
      nzTitle: !doc ? `创建` : `编辑【${doc.name}】`,
      nzContent: AreaFormComponent,
      nzData: {
        shopId: this.app.shopId!,
        doc
      },
      nzOnOk: () => {
        this.update();
        this.getData(true);
      }
    });
  }

  delete(doc: AnyDto<Area>): void {
    this.modal.confirm({
      nzTitle: $localize`您确定要删除【${doc.name}】?`,
      nzOkText: $localize`是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzCancelText: $localize`再想想`,
      nzOnOk: () => {
        this.areas.delete(doc._id).subscribe(() => {
          this.message.success($localize`数据删除成功`);
          this.update();
          this.getData(true);
        });
      }
    });
  }

  bulkDelete(): void {
    this.modal.confirm({
      nzTitle: $localize`您确认要删除这些文件吗?`,
      nzOkText: $localize`是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.areas
          .bulkDelete(
            { _id: { $in: [...this.ds.checkedIds.values()] } },
            {
              xfilter: { '_id.$in': 'oids' }
            }
          )
          .subscribe(() => {
            this.message.success($localize`数据删除成功`);
            this.update();
            this.ds.checkedIds.clear();
            this.ds.updateCheckedStatus();
            this.getData(true);
          });
      },
      nzCancelText: $localize`否`
    });
  }
}
