import { Component, OnInit } from '@angular/core';

import { Shop } from '@common/interfaces/shop';
import { ShopsService } from '@common/services/shops.service';
import { AnyDto, WpxData } from '@weplanx/ng';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-layout-sidenav',
  templateUrl: './sidenav.component.html'
})
export class SidenavComponent implements OnInit {
  ds: WpxData<AnyDto<Shop>> = new WpxData();
  searchText = '';

  constructor(private shops: ShopsService, private ref: NzDrawerRef) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(refresh = false): void {
    this.shops.pages(this.ds, refresh).subscribe(() => {});
  }

  search(): void {
    if (!this.searchText) {
      this.ds.filter = {};
    } else {
      this.ds.filter = {
        name: { $regex: this.searchText }
      };
    }
    this.getData(true);
  }

  close(): void {
    this.ref.close();
  }
}
