import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { SettingsComponent } from './settings.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: 'basis',
        loadChildren: () => import('./basis/basis.module').then(m => m.BasisModule),
        data: {
          breadcrumb: $localize`基础`
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
      { path: '', redirectTo: 'basis', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [SettingsComponent]
})
export class SettingsModule {}
