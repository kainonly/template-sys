import { Component } from '@angular/core';

import { AppService } from '@app';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html'
})
export class StatisticsComponent {
  constructor(public app: AppService) {}
}
