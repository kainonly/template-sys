import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShopFormModule } from '@common/components/shop-form/shop-form.module';
import { ShareModule } from '@common/share.module';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        data: {
          breadcrumb: $localize`实时看板`
        }
      },
      {
        path: 'journal',
        loadChildren: () => import('./journal/journal.module').then(m => m.JournalModule),
        data: {
          breadcrumb: $localize`收银表报`
        }
      },
      {
        path: 'summary',
        loadChildren: () => import('./summary/summary.module').then(m => m.SummaryModule),
        data: {
          breadcrumb: $localize`营业汇总`
        }
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, ShopFormModule, RouterModule.forChild(routes)]
})
export class OverviewModule {}
