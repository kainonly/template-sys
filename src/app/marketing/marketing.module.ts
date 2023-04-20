import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { MarketingComponent } from './marketing.component';

const routes: Routes = [
  {
    path: '',
    component: MarketingComponent,
    children: [
      {
        path: 'member',
        loadChildren: () => import('./member/member.module').then(m => m.MemberModule),
        data: {
          breadcrumb: $localize`会员`
        }
      },
      { path: '', redirectTo: 'member', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [MarketingComponent]
})
export class MarketingModule {}
