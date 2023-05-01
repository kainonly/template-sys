import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShopFormModule } from '@common/components/shop-form/shop-form.module';
import { ShareModule } from '@common/share.module';

const routes: Routes = [
  {
    path: '',
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
      { path: '', redirectTo: 'remarks', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, ShopFormModule, RouterModule.forChild(routes)]
})
export class OtherModule {}
