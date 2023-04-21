import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { AreasComponent } from './areas/areas.component';
import { PeriodsComponent } from './periods/periods.component';
import { ShopComponent } from './shop.component';

const routes: Routes = [
  {
    path: '',
    component: ShopComponent,
    children: [
      {
        path: 'areas',
        component: AreasComponent,
        data: {
          breadcrumb: $localize`区位列表`
        }
      },
      {
        path: 'periods',
        component: PeriodsComponent,
        data: {
          breadcrumb: $localize`营业时段`
        }
      },
      { path: '', redirectTo: 'areas', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [ShopComponent, AreasComponent, PeriodsComponent]
})
export class ShopModule {}
