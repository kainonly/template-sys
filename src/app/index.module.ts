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
        path: 'overview',
        loadChildren: () => import('./overview/overview.module').then(m => m.OverviewModule),
        data: {
          breadcrumb: $localize`总览`
        }
      },
      {
        path: 'restaurants',
        loadChildren: () => import('./restaurants/restaurants.module').then(m => m.RestaurantsModule),
        data: {
          breadcrumb: $localize`餐厅`
        }
      },
      {
        path: 'ordering',
        loadChildren: () => import('./ordering/ordering.module').then(m => m.OrderingModule),
        data: {
          breadcrumb: $localize`点餐`
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
        path: 'marketing',
        loadChildren: () => import('./marketing/marketing.module').then(m => m.MarketingModule),
        data: {
          breadcrumb: $localize`营销`
        }
      },
      { path: '', redirectTo: 'overview', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [IndexComponent]
})
export class IndexModule {}