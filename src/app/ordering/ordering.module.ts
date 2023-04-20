import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { OrderingComponent } from './ordering.component';

const routes: Routes = [
  {
    path: '',
    component: OrderingComponent,
    children: [
      {
        path: 'menu',
        loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule),
        data: {
          breadcrumb: $localize`菜单`
        }
      },
      {
        path: 'strategy',
        loadChildren: () => import('./strategy/strategy.module').then(m => m.StrategyModule),
        data: {
          breadcrumb: $localize`策略`
        }
      },
      { path: '', redirectTo: 'menu', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [OrderingComponent]
})
export class OrderingModule {}
