import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { AreasComponent } from './areas/areas.component';
import { PeriodComponent } from './period/period.component';
import { RestaurantComponent } from './restaurant.component';
import { TeaComponent } from './tea/tea.component';

const routes: Routes = [
  {
    path: '',
    component: RestaurantComponent,
    children: [
      {
        path: 'areas',
        component: AreasComponent
      },
      {
        path: 'period',
        component: PeriodComponent
      },
      {
        path: 'tea',
        component: TeaComponent
      },
      { path: '', redirectTo: 'areas', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [RestaurantComponent, AreasComponent, PeriodComponent, TeaComponent]
})
export class RestaurantModule {}
