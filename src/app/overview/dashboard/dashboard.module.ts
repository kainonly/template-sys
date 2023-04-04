import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { DashboardComponent } from './dashboard.component';
import { TurnoverComponent } from './turnover/turnover.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [DashboardComponent, TurnoverComponent]
})
export class DashboardModule {}
