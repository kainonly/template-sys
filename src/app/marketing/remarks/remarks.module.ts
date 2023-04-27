import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { FormComponent } from './form/form.component';
import { RemarksComponent } from './remarks.component';

const routes: Routes = [
  {
    path: '',
    component: RemarksComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [RemarksComponent, FormComponent]
})
export class RemarksModule {}
