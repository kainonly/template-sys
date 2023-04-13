import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { DishesComponent } from './dishes.component';
import { FormComponent } from './form/form.component';
import { TypeFormComponent } from './type-form/type-form.component';

const routes: Routes = [
  {
    path: '',
    component: DishesComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [DishesComponent, FormComponent, TypeFormComponent]
})
export class DishesModule {}
