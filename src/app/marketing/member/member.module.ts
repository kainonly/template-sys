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
      { path: '', redirectTo: 'lists', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)]
})
export class MemberModule {}
