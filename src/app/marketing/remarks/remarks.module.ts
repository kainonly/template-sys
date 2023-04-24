import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { RemarksComponent } from './remarks.component';

const routes: Routes = [
  {
    path: '',
    component: RemarksComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [RemarksComponent]
})
export class RemarksModule {}
