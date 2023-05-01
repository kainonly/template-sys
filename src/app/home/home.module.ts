import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'overview',
        loadChildren: () => import('./overview/overview.module').then(m => m.OverviewModule),
        data: {
          breadcrumb: $localize`概况`
        }
      },
      {
        path: 'service',
        loadChildren: () => import('./service/service.module').then(m => m.ServiceModule),
        data: {
          breadcrumb: $localize`服务`
        }
      },
      {
        path: 'other',
        loadChildren: () => import('./other/other.module').then(m => m.OtherModule),
        data: {
          breadcrumb: $localize`其他`
        }
      },
      { path: '', redirectTo: 'overview', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [HomeComponent]
})
export class HomeModule {}
