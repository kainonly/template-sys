import { Component, OnInit } from '@angular/core';

import { AppService } from '@app';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html'
})
export class ResourcesComponent implements OnInit {
  shopId!: string;

  constructor(public app: AppService) {}

  ngOnInit(): void {
    this.app.shop.subscribe(data => {
      this.shopId = data._id;
    });
  }
}
