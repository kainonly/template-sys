import { Injectable } from '@angular/core';

import { Remark } from '@common/interfaces/remark';
import { WpxApi } from '@weplanx/ng';

@Injectable({ providedIn: 'root' })
export class RemarksService extends WpxApi<Remark> {
  protected override collection = 'remarks';
}
