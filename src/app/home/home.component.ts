import { Component, OnInit } from '@angular/core';

import { AppService } from '@app';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchText = '';

  constructor(public app: AppService) {}

  ngOnInit(): void {}
}
