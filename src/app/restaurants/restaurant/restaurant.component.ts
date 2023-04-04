import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

import { Restaurant } from '@common/interfaces/restaurant';
import { RestaurantsService } from '@common/services/restaurants.service';
import { AnyDto, WpxService } from '@weplanx/ng';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent } from '../form/form.component';
import { OutlineService } from '../outline.service';

@Component({
  selector: 'app-restaurants-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {
  restaurant?: AnyDto<Restaurant>;
  id!: string;

  constructor(
    public wpx: WpxService,
    private route: ActivatedRoute,
    private modal: NzModalService,
    private restaurants: RestaurantsService,
    private outline: OutlineService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        map(v => {
          this.id = v['id'];
          return v['id'];
        }),
        switchMap(id => this.restaurants.get(id))
      )
      .subscribe(data => {
        this.restaurant = data;
      });
  }

  form(): void {
    this.modal.create({
      nzTitle: `编辑【${this.restaurant!.name}】`,
      nzContent: FormComponent,
      nzWidth: 640,
      nzComponentParams: {
        doc: this.restaurant
      },
      nzOnOk: () => {
        this.outline.restaurant$.next(this.restaurant!._id);
      }
    });
  }
}
