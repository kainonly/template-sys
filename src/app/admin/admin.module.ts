import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'integrated',
        loadChildren: () => import('./integrated/integrated.module').then(m => m.IntegratedModule),
        data: {
          breadcrumb: $localize`集成`
        }
      },
      {
        path: 'orgs',
        loadChildren: () => import('./orgs/orgs.module').then(m => m.OrgsModule),
        data: {
          breadcrumb: $localize`组织`
        }
      },
      {
        path: 'system',
        loadChildren: () => import('./system/system.module').then(m => m.SystemModule),
        data: {
          breadcrumb: $localize`系统`
        }
      },
      {
        path: 'audit',
        loadChildren: () => import('./audit/audit.module').then(m => m.AuditModule),
        data: {
          breadcrumb: $localize`审计`
        }
      },
      { path: '', redirectTo: 'integrated', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [AdminComponent]
})
export class AdminModule {}
