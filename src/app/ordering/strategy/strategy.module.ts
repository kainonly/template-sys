import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'categories',
        loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule),
        data: {
          breadcrumb: $localize`统计种类`
        }
      },
      {
        path: 'markups',
        loadChildren: () => import('./markups/markups.module').then(m => m.MarkupsModule),
        data: {
          breadcrumb: $localize`菜品加价`
        }
      },
      {
        path: 'periods',
        loadChildren: () => import('./periods/periods.module').then(m => m.PeriodsModule),
        data: {
          breadcrumb: $localize`时段排序`
        }
      },
      { path: '', redirectTo: 'categories', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)]
})
export class StrategyModule {}
