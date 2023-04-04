import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'cloud',
        loadChildren: () => import('./cloud/cloud.module').then(m => m.CloudModule),
        data: {
          breadcrumb: $localize`公有云`
        }
      },
      {
        path: 'extend',
        loadChildren: () => import('./extend/extend.module').then(m => m.ExtendModule),
        data: {
          breadcrumb: $localize`扩展服务`
        }
      },
      { path: '', redirectTo: 'cloud', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)]
})
export class IntegratedModule {}
