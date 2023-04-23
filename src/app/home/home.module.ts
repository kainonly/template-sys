import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { AreaFormComponent } from './area-form/area-form.component';
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
          breadcrumb: $localize`门店概况`
        }
      },
      {
        path: 'areas/:areaId',
        loadChildren: () => import('./area/area.module').then(m => m.AreaModule),
        data: {
          breadcrumb: $localize`堂食导航`
        }
      },
      { path: '', redirectTo: 'overview', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [HomeComponent, AreaFormComponent]
})
export class HomeModule {}
