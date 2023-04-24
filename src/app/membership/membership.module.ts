import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { LevelFormComponent } from './level-form/level-form.component';
import { MembershipComponent } from './membership.component';

const routes: Routes = [
  {
    path: '',
    component: MembershipComponent,
    children: [
      {
        path: 'settings',
        children: [
          {
            path: 'recharge',
            loadChildren: () => import('./recharge/recharge.module').then(m => m.RechargeModule),
            data: {
              breadcrumb: $localize`优惠充值`
            }
          },
          {
            path: 'points',
            loadChildren: () => import('./points/points.module').then(m => m.PointsModule),
            data: {
              breadcrumb: $localize`积分设置`
            }
          },
          { path: '', redirectTo: 'recharge', pathMatch: 'full' }
        ],
        data: {
          breadcrumb: $localize`设置`
        }
      },
      {
        path: 'all',
        loadChildren: () => import('./members/members.module').then(m => m.MembersModule)
      },
      {
        path: ':id',
        loadChildren: () => import('./members/members.module').then(m => m.MembersModule)
      },
      { path: '', redirectTo: 'all', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [MembershipComponent, LevelFormComponent]
})
export class MembershipModule {}
