import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { AreaFormComponent } from './area-form/area-form.component';
import { AreasComponent } from './areas/areas.component';
import { DineComponent } from './dine.component';
import { IndexComponent } from './index/index.component';
import { TableFormComponent } from './table-form/table-form.component';

const routes: Routes = [
  {
    path: '',
    component: DineComponent,
    children: [
      {
        path: 'all',
        component: IndexComponent,
        data: {
          breadcrumb: $localize`全部餐台`
        }
      },
      {
        path: ':id',
        component: IndexComponent,
        data: {
          breadcrumb: $localize`区位导航`
        }
      },
      { path: '', redirectTo: 'all', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [DineComponent, AreasComponent, AreaFormComponent, IndexComponent, TableFormComponent]
})
export class DineModule {}
