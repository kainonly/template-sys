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
        loadChildren: () => import('./dishes/dishes.module').then(m => m.DishesModule)
      },
      {
        path: 'types',
        loadChildren: () => import('./types/types.module').then(m => m.TypesModule)
      },
      {
        path: ':id',
        loadChildren: () => import('./dishes/dishes.module').then(m => m.DishesModule)
      },
      { path: '', redirectTo: 'all', pathMatch: 'full' }
    ],
    data: {
      breadcrumb: $localize`菜谱`
    }
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [MenuComponent, TypeFormComponent]
})
export class MenuModule {}
