import { Component, OnInit } from '@angular/core';

import { AppService } from '@app';

@Component({
  selector: 'app-ordering',
  templateUrl: './ordering.component.html'
})
export class OrderingComponent implements OnInit {
  shopId!: string;

  constructor(public app: AppService) {}

  ngOnInit(): void {
    this.app.shop.subscribe(data => {
      this.shopId = data._id;
    });
  }
}
