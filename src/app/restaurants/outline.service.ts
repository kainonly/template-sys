import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { OutlineStatus, RestaurantId } from './types';

@Injectable()
export class OutlineService {
  selected$: Subject<string> = new Subject();
  restaurant$: Subject<RestaurantId | undefined> = new Subject();
  area$: Subject<RestaurantId> = new Subject();
}
