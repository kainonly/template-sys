import { Injectable } from '@angular/core';

import { MemberLevel } from '@common/interfaces/member-level';
import { WpxApi } from '@weplanx/ng';

@Injectable({ providedIn: 'root' })
export class MemberLevelsService extends WpxApi<MemberLevel> {
  protected override collection = 'member_levels';
}
