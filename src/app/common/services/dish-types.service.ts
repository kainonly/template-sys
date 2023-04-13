import { Injectable } from '@angular/core';

import { Dish } from '@common/interfaces/dish';
import { DishType } from '@common/interfaces/dish-type';
import { WpxApi } from '@weplanx/ng';

@Injectable({ providedIn: 'root' })
export class DishTypesService extends WpxApi<DishType> {}
