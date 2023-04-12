import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Restaurant, RestaurantDict } from '@common/interfaces/restaurant';
import { AnyDto, Filter, WpxApi } from '@weplanx/ng';

@Injectable({ providedIn: 'root' })
export class RestaurantsService extends WpxApi<Restaurant> {
  protected override collection = 'restaurants';
  private dict: BehaviorSubject<RestaurantDict> = new BehaviorSubject({});

  set(v: RestaurantDict): void {
    this.dict.next(v);
  }

  get(id: string): Observable<AnyDto<Restaurant>> {
    return this.dict.pipe(map(v => v[id]));
  }

  values(): Observable<Array<AnyDto<Restaurant>>> {
    return this.dict.pipe(map(v => Object.values(v)));
  }
}
