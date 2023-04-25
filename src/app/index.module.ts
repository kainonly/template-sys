import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { IndexComponent } from './index.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
        data: {
          breadcrumb: $localize`工作台`
        }
      },
      {
        path: 'menu',
        loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule),
        data: {
          breadcrumb: $localize`菜单`
        }
      },
      {
        path: 'membership',
        loadChildren: () => import('./membership/membership.module').then(m => m.MembershipModule),
        data: {
          breadcrumb: $localize`会员`
        }
      },
      {
        path: 'marketing',
        loadChildren: () => import('./marketing/marketing.module').then(m => m.MarketingModule),
        data: {
          breadcrumb: $localize`营销`
        }
      },
      {
        path: 'resources',
        loadChildren: () => import('./resources/resources.module').then(m => m.ResourcesModule),
        data: {
          breadcrumb: $localize`资源`
        }
      },
      {
        path: 'statistics',
        loadChildren: () => import('./statistics/statistics.module').then(m => m.StatisticsModule),
        data: {
          breadcrumb: $localize`统计`
        }
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [IndexComponent]
})
export class IndexModule {}
