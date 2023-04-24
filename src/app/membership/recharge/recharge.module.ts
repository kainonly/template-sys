import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { RechargeComponent } from './recharge.component';

const routes: Routes = [
  {
    path: '',
    component: RechargeComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [RechargeComponent]
})
export class RechargeModule {}
