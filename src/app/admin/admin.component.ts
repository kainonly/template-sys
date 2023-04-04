import { Component, OnDestroy, OnInit } from '@angular/core';

import { AppService } from '@app';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit, OnDestroy {
  constructor(private app: AppService) {}

  ngOnInit(): void {
    this.app.inAdmin = true;
  }

  ngOnDestroy(): void {
    this.app.inAdmin = false;
  }
}
