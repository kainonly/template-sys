import { Component } from '@angular/core';

import { AppService } from '@app';

@Component({
  selector: 'app-ordering',
  templateUrl: './ordering.component.html'
})
export class OrderingComponent {
  constructor(public app: AppService) {}
}
