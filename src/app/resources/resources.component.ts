import { Component } from '@angular/core';

import { AppService } from '@app';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html'
})
export class ResourcesComponent {
  constructor(public app: AppService) {}
}
