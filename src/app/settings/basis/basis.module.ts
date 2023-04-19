import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'shops',
        loadChildren: () => import('./shops/shops.module').then(m => m.ShopsModule),
        data: {
          breadcrumb: $localize`门店管理`
        }
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
        data: {
          breadcrumb: $localize`店长管理`
        }
      },
      { path: '', redirectTo: 'shops', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)]
})
export class BasisModule {}
