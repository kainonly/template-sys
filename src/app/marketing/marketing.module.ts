import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { MarketingComponent } from './marketing.component';

const routes: Routes = [
  {
    path: '',
    component: MarketingComponent,
    children: [
      {
        path: 'remarks',
        loadChildren: () => import('./remarks/remarks.module').then(m => m.RemarksModule),
        data: {
          breadcrumb: $localize`备注要求`
        }
      },
      {
        path: 'reasons',
        loadChildren: () => import('./reasons/reasons.module').then(m => m.ReasonsModule),
        data: {
          breadcrumb: $localize`理由预设`
        }
      },
      {
        path: 'recharge',
        loadChildren: () => import('./recharge/recharge.module').then(m => m.RechargeModule),
        data: {
          breadcrumb: $localize`优惠充值`
        }
      },
      {
        path: 'plans/:id',
        loadChildren: () => import('./plans/plans.module').then(m => m.PlansModule),
        data: {
          breadcrumb: $localize`折扣方案`
        }
      },
      { path: '', redirectTo: 'remarks', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [MarketingComponent]
})
export class MarketingModule {}
