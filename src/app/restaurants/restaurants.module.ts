import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { AreaFormComponent } from './area-form/area-form.component';
import { AreasService } from './areas.service';
import { FormComponent } from './form/form.component';
import { OutlineComponent } from './outline.component';
import { OutlineService } from './outline.service';
import { RestaurantsComponent } from './restaurants.component';
import { TableFormComponent } from './table-form/table-form.component';
import { TableService } from './table.service';

const routes: Routes = [
  {
    path: '',
    component: RestaurantsComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./index/index.module').then(m => m.IndexModule)
      },
      {
        path: ':id',
        loadChildren: () => import('./restaurant/restaurant.module').then(m => m.RestaurantModule)
      },
      {
        path: ':id/areas/:areaId',
        loadChildren: () => import('./area/area.module').then(m => m.AreaModule)
      }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [RestaurantsComponent, OutlineComponent, FormComponent, AreaFormComponent, TableFormComponent],
  providers: [OutlineService, AreasService, TableService]
})
export class RestaurantsModule {}
