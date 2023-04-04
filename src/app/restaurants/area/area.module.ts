import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { AreaComponent } from './area.component';

const routes: Routes = [
  {
    path: '',
    component: AreaComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [AreaComponent]
})
export class AreaModule {}
