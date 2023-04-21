import { Injectable } from '@angular/core';

import { Area } from '@common/interfaces/area';
import { WpxApi } from '@weplanx/ng';

@Injectable({ providedIn: 'root' })
export class AreasService extends WpxApi<Area> {
  protected override collection = 'areas';
}
