import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { DishType, DishTypeDict } from '@common/interfaces/dish-type';
import { WpxApi } from '@weplanx/ng';

@Injectable({ providedIn: 'root' })
export class DishTypesService extends WpxApi<DishType> {
  protected override collection = 'dish_types';
  dict: BehaviorSubject<DishTypeDict> = new BehaviorSubject({});
  scopeDict: Record<number, string> = {
    1: $localize`堂食`,
    2: $localize`快餐`,
    3: $localize`外卖`
  };

  set(v: DishTypeDict): void {
    this.dict.next(v);
  }
}
