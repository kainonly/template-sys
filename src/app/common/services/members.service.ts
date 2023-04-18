import { Injectable } from '@angular/core';

import { Member } from '@common/interfaces/member';
import { WpxApi } from '@weplanx/ng';

@Injectable({ providedIn: 'root' })
export class MembersService extends WpxApi<Member> {
  protected override collection = 'members';
}
