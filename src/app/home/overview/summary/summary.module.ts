import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { SummaryComponent } from './summary.component';

const routes: Routes = [
  {
    path: '',
    component: SummaryComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [SummaryComponent]
})
export class SummaryModule {}
