import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { OverviewComponent } from './overview.component';
import { OverviewService } from './overview.service';

const routes: Routes = [
  {
    path: '',
    component: OverviewComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        data: {
          breadcrumb: $localize`营业概况`
        }
      },
      {
        path: 'journal',
        loadChildren: () => import('./journal/journal.module').then(m => m.JournalModule),
        data: {
          breadcrumb: $localize`流水账`
        }
      },
      {
        path: 'report',
        loadChildren: () => import('./report/report.module').then(m => m.ReportModule),
        data: {
          breadcrumb: $localize`理由报表`
        }
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [OverviewComponent],
  providers: [OverviewService]
})
export class OverviewModule {}
