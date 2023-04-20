import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppService } from '@app';
import { WpxService } from '@weplanx/ng';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-overview-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  constructor(public app: AppService, public wpx: WpxService, private modal: NzModalService) {}

  ngOnInit(): void {}

  form(): void {
    // this.modal.create<FormComponent, FormData>({
    //   nzTitle: `编辑【${this.restaurant!.name}】`,
    //   nzContent: FormComponent,
    //   nzWidth: 640,
    //   nzData: {
    //     doc: this.restaurant
    //   },
    //   nzOnOk: () => {
    //     this.outline.restaurant$.next(this.restaurant!._id);
    //   }
    // });
  }
}
