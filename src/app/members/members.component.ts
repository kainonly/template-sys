import { Component } from '@angular/core';

import { AppService } from '@app';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html'
})
export class MembersComponent {
  searchText = '';

  constructor(public app: AppService) {}
}
