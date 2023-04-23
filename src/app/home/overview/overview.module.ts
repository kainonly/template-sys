import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShopFormModule } from '@common/components/shop-form/shop-form.module';
import { ShareModule } from '@common/share.module';

import { OverviewComponent } from './overview.component';

const routes: Routes = [
  {
    path: '',
    component: OverviewComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        data: {
          breadcrumb: $localize`实时看板`
        }
      },
      {
        path: 'areas',
        loadChildren: () => import('./areas/areas.module').then(m => m.AreasModule),
        data: {
          breadcrumb: $localize`堂食区位`
        }
      },
      {
        path: 'cards',
        loadChildren: () => import('./cards/cards.module').then(m => m.CardsModule),
        data: {
          breadcrumb: $localize`快餐牌号`
        }
      },
      {
        path: 'periods',
        loadChildren: () => import('./periods/periods.module').then(m => m.PeriodsModule),
        data: {
          breadcrumb: $localize`营业时段`
        }
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, ShopFormModule, RouterModule.forChild(routes)],
  declarations: [OverviewComponent]
})
export class OverviewModule {}
