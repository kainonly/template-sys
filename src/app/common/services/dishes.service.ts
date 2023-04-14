import { Injectable } from '@angular/core';

import { Dish } from '@common/interfaces/dish';
import { WpxApi } from '@weplanx/ng';

@Injectable({ providedIn: 'root' })
export class DishesService extends WpxApi<Dish> {
  protected override collection = 'dishes';
}
