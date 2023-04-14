import { Injectable } from '@angular/core';

import { MemberBenefit } from '@common/interfaces/member-benefit';
import { WpxApi } from '@weplanx/ng';

@Injectable({ providedIn: 'root' })
export class MemberBenefitsService extends WpxApi<MemberBenefit> {
  protected override collection = 'member_benefits';
}
