import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { MenuComponent } from './menu.component';
import { TypeFormComponent } from './type-form/type-form.component';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: [
      {
        path: 'all',
        loadChildren: () => import('./dishes/dishes.module').then(m => m.DishesModule),
        data: {
          breadcrumb: $localize`全部`
        }
      },
      {
        path: 'types',
        loadChildren: () => import('./types/types.module').then(m => m.TypesModule),
        data: {
          breadcrumb: $localize`分类列表`
        }
      },
      {
        path: ':id',
        loadChildren: () => import('./dishes/dishes.module').then(m => m.DishesModule),
        data: {
          breadcrumb: $localize`分类导航`
        }
      },
      { path: '', redirectTo: 'all', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [MenuComponent, TypeFormComponent]
})
export class MenuModule {}
