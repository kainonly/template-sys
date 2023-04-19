import { Injectable } from '@angular/core';

import { Shop } from '@common/interfaces/shop';
import { WpxApi } from '@weplanx/ng';

@Injectable({ providedIn: 'root' })
export class ShopsService extends WpxApi<Shop> {
  protected override collection = 'shops';
}
