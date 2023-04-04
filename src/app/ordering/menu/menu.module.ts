import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dishes',
        loadChildren: () => import('./dishes/dishes.module').then(m => m.DishesModule),
        data: {
          breadcrumb: $localize`菜品管理`
        }
      },
      {
        path: 'packages',
        loadChildren: () => import('./packages/packages.module').then(m => m.PackagesModule),
        data: {
          breadcrumb: $localize`套餐管理`
        }
      },
      {
        path: 'methods',
        loadChildren: () => import('./methods/methods.module').then(m => m.MethodsModule),
        data: {
          breadcrumb: $localize`做法与口味`
        }
      },
      { path: '', redirectTo: 'dishes', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)]
})
export class MenuModule {}
