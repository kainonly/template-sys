import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { OutlineStatus } from './types';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit {
  id?: string;
  areaId?: string;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(() => {
      this.id = this.route.firstChild?.snapshot.params['id'] as string;
      this.areaId = this.route.firstChild?.snapshot.params['areaId'];
    });
  }

  navigated(e?: OutlineStatus): void {
    if (!e) {
      this.router.navigate(['/_', 'restaurants']);
      return;
    }
    switch (e.type) {
      case 'restaurant':
        this.router.navigate(['/_', 'restaurants', e.id]);
        break;
      case 'area':
        this.router.navigate(['/_', 'restaurants', e.id, 'areas', e.areaId]);
        break;
    }
  }
}
