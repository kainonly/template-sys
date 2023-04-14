import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { BenefitsComponent } from './benefits.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  {
    path: '',
    component: BenefitsComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [BenefitsComponent, FormComponent]
})
export class BenefitsModule {}
