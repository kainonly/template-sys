import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { FormComponent } from './form/form.component';
import { IndexComponent } from './index.component';
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
        component: IndexComponent,
        data: {
          breadcrumb: $localize`全部菜品`
        }
      },
      {
        path: ':id',
        component: IndexComponent,
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
  declarations: [MenuComponent, IndexComponent, FormComponent, TypesComponent, TypeFormComponent]
})
export class MenuModule {}
