import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { PointsComponent } from './points.component';

const routes: Routes = [
  {
    path: '',
    component: PointsComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [PointsComponent]
})
export class PointsModule {}
