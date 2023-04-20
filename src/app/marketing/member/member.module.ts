import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'lists',
        loadChildren: () => import('./lists/lists.module').then(m => m.ListsModule),
        data: {
          breadcrumb: $localize`会员列表`
        }
      },
      {
        path: 'benefits',
        loadChildren: () => import('./benefits/benefits.module').then(m => m.BenefitsModule),
        data: {
          breadcrumb: $localize`会员权益`
        }
      },
      {
        path: 'upgrade',
        loadChildren: () => import('./upgrade/upgrade.module').then(m => m.UpgradeModule),
        data: {
          breadcrumb: $localize`如何升级`
        }
      },
      { path: '', redirectTo: 'lists', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)]
})
export class MemberModule {}
