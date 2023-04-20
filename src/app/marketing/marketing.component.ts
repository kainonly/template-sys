import { Component } from '@angular/core';

import { AppService } from '@app';

@Component({
  selector: 'app-marketing',
  templateUrl: './marketing.component.html'
})
export class MarketingComponent {
  constructor(public app: AppService) {}
}
