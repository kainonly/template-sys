import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { FormComponent } from './form/form.component';
import { IndexComponent } from './index.component';
import { LevelFormComponent } from './level-form/level-form.component';
import { LevelsComponent } from './levels/levels.component';
import { MembershipComponent } from './membership.component';

const routes: Routes = [
  {
    path: '',
    component: MembershipComponent,
    children: [
      {
        path: 'all',
        component: IndexComponent,
        data: {
          breadcrumb: $localize`全部会员`
        }
      },
      {
        path: ':id',
        component: IndexComponent,
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
  declarations: [MembershipComponent, IndexComponent, FormComponent, LevelsComponent, LevelFormComponent]
})
export class MembershipModule {}
