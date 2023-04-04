import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { PeriodsComponent } from './periods.component';

const routes: Routes = [
  {
    path: '',
    component: PeriodsComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [PeriodsComponent]
})
export class PeriodsModule {}
