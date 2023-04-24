import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'member-upgrade',
        loadChildren: () => import('./member-upgrade/member-upgrade.module').then(m => m.MemberUpgradeModule),
        data: {
          breadcrumb: $localize`会员升级`
        }
      },
      { path: '', redirectTo: 'member-upgrade', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)]
})
export class ArticlesModule {}
