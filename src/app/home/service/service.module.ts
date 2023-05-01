import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShopFormModule } from '@common/components/shop-form/shop-form.module';
import { ShareModule } from '@common/share.module';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'snack',
        loadChildren: () => import('./snack/snack.module').then(m => m.SnackModule),
        data: {
          breadcrumb: $localize`快餐订单`
        }
      },
      {
        path: 'takeout',
        loadChildren: () => import('./takeout/takeout.module').then(m => m.TakeoutModule),
        data: {
          breadcrumb: $localize`外卖订单`
        }
      },
      {
        path: 'dine',
        loadChildren: () => import('./dine/dine.module').then(m => m.DineModule),
        data: {
          breadcrumb: $localize`堂食订单`
        }
      },
      { path: '', redirectTo: 'snack', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, ShopFormModule, RouterModule.forChild(routes)]
})
export class ServiceModule {}
