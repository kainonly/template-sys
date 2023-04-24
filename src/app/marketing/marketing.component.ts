import { Component, OnInit } from '@angular/core';

import { AppService } from '@app';

@Component({
  selector: 'app-marketing',
  templateUrl: './marketing.component.html'
})
export class MarketingComponent implements OnInit {
  searchText = '';

  constructor(public app: AppService) {}

  ngOnInit(): void {}
}
