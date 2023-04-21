import { Component, OnInit } from '@angular/core';

import { AppService } from '@app';

@Component({
  selector: 'app-marketing',
  templateUrl: './marketing.component.html'
})
export class MarketingComponent implements OnInit {
  shopId!: string;

  constructor(public app: AppService) {}

  ngOnInit(): void {
    this.app.shop.subscribe(data => {
      this.shopId = data._id;
    });
  }
}
