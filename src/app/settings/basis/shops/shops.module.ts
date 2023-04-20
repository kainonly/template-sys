import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { FormComponent } from './form/form.component';
import { ShopsComponent } from './shops.component';

const routes: Routes = [
  {
    path: '',
    component: ShopsComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [ShopsComponent, FormComponent]
})
export class ShopsModule {}
