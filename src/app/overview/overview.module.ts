import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { areaResolver } from './area/area.resolver';
import { AreaFormComponent } from './area-form/area-form.component';
import { OverviewComponent } from './overview.component';

const routes: Routes = [
  {
    path: '',
    component: OverviewComponent,
    children: [
      {
        path: 'shop',
        loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule)
      },
      {
        path: 'areas/:areaId',
        loadChildren: () => import('./area/area.module').then(m => m.AreaModule),
        resolve: {
          area: areaResolver
        }
      },
      { path: '', redirectTo: 'shop', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [OverviewComponent, AreaFormComponent]
})
export class OverviewModule {}
