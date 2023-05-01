import { Component } from '@angular/core';

import { AppService } from '@app';
import { AnyDto, WpxData } from '@weplanx/ng';

@Component({
  selector: 'app-home-service-takeout',
  templateUrl: './takeout.component.html'
})
export class TakeoutComponent {
  ds: WpxData<AnyDto<any>> = new WpxData<AnyDto<any>>();
  searchText = '';

  constructor(public app: AppService) {}

  getData(refresh = false): void {
    this.ds.filter = {
      shop_id: this.app.shopId
    };
    if (this.searchText) {
      this.ds.filter['$or'] = [{ sn: { $regex: this.searchText } }];
    }
  }

  clear(): void {
    this.searchText = '';
    this.getData(true);
  }
}
