import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { TakeoutComponent } from './takeout.component';

const routes: Routes = [
  {
    path: '',
    component: TakeoutComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [TakeoutComponent]
})
export class TakeoutModule {}
