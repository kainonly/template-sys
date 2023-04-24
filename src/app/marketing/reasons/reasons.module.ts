import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { ReasonsComponent } from './reasons.component';

const routes: Routes = [
  {
    path: '',
    component: ReasonsComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [ReasonsComponent]
})
export class ReasonsModule {}
