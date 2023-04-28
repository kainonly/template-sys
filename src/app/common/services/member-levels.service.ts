import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { MemberLevel, MemberLevelDict } from '@common/interfaces/member-level';
import { WpxApi } from '@weplanx/ng';

@Injectable({ providedIn: 'root' })
export class MemberLevelsService extends WpxApi<MemberLevel> {
  protected override collection = 'member_levels';
  dict: BehaviorSubject<MemberLevelDict> = new BehaviorSubject({});

  set(v: MemberLevelDict): void {
    this.dict.next(v);
  }
}
