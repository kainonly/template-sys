import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { PayComponent } from './pay.component';

const routes: Routes = [
  {
    path: '',
    component: PayComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [PayComponent]
})
export class PayModule {}
