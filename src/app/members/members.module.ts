import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { MembersComponent } from './members.component';

const routes: Routes = [
  {
    path: '',
    component: MembersComponent,
    children: [
      {
        path: 'index',
        loadChildren: () => import('./index/index.module').then(m => m.IndexModule),
        data: {
          breadcrumb: $localize`全部`
        }
      },
      { path: '', redirectTo: 'index', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [MembersComponent]
})
export class MembersModule {}
