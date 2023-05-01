import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { DineComponent } from './dine.component';

const routes: Routes = [
  {
    path: '',
    component: DineComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [DineComponent]
})
export class DineModule {}
