import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { PlansComponent } from './plans.component';

const routes: Routes = [
  {
    path: '',
    component: PlansComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [PlansComponent]
})
export class PlansModule {}
