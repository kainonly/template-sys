import { Component } from '@angular/core';

import { OverviewService } from './overview.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html'
})
export class OverviewComponent {
  constructor(public overview: OverviewService) {}
}
