import { Injectable } from '@angular/core';

import { Recharge } from '@common/interfaces/recharge';
import { WpxApi } from '@weplanx/ng';

@Injectable({ providedIn: 'root' })
export class RechargesService extends WpxApi<Recharge> {
  protected override collection = 'recharges';
}
