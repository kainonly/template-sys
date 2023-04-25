import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { StatisticsComponent } from './statistics.component';

const routes: Routes = [
  {
    path: '',
    component: StatisticsComponent,
    children: []
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [StatisticsComponent]
})
export class StatisticsModule {}
