import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { DishesComponent } from './dishes/dishes.component';
import { FormComponent } from './form/form.component';
import { MenuComponent } from './menu.component';
import { TypeFormComponent } from './type-form/type-form.component';
import { TypesComponent } from './types/types.component';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: [
      {
        path: 'all',
        component: DishesComponent,
        data: {
          breadcrumb: $localize`全部菜品`
        }
      },
      {
        path: ':id',
        component: DishesComponent,
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
  declarations: [MenuComponent, DishesComponent, FormComponent, TypesComponent, TypeFormComponent]
})
export class MenuModule {}
