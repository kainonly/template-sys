import { Component, OnInit } from '@angular/core';

import { AppService } from '@app';
import { Shop } from '@common/interfaces/shop';
import { AnyDto, WpxService } from '@weplanx/ng';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-overview-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  shop!: AnyDto<Shop>;

  constructor(public app: AppService, public wpx: WpxService, private modal: NzModalService) {}

  ngOnInit(): void {
    this.app.shop.subscribe(data => {
      this.shop = data;
    });
  }

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
