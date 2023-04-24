import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { SnackComponent } from './snack.component';

const routes: Routes = [
  {
    path: '',
    component: SnackComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [SnackComponent]
})
export class SnackModule {}
