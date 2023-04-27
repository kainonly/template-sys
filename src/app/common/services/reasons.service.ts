import { Injectable } from '@angular/core';

import { Reason } from '@common/interfaces/reason';
import { WpxApi } from '@weplanx/ng';

@Injectable({ providedIn: 'root' })
export class ReasonsService extends WpxApi<Reason> {
  protected override collection = 'reasons';
}
