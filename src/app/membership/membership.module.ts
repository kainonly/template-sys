import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { FormComponent } from './form/form.component';
import { LevelFormComponent } from './level-form/level-form.component';
import { MembershipComponent } from './membership.component';

const routes: Routes = [
  {
    path: '',
    component: MembershipComponent,
    children: [
      {
        path: 'all',
        loadChildren: () => import('./members/members.module').then(m => m.MembersModule),
        data: {
          breadcrumb: $localize`全部`
        }
      },
      {
        path: 'levels',
        loadChildren: () => import('./levels/levels.module').then(m => m.LevelsModule),
        data: {
          breadcrumb: $localize`等级列表`
        }
      },
      {
        path: ':id',
        loadChildren: () => import('./members/members.module').then(m => m.MembersModule),
        data: {
          breadcrumb: $localize`等级导航`
        }
      },
      { path: '', redirectTo: 'all', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [MembershipComponent, LevelFormComponent, FormComponent]
})
export class MembershipModule {}
