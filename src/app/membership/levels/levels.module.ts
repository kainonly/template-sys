import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { LevelsComponent } from './levels.component';

const routes: Routes = [
  {
    path: '',
    component: LevelsComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [LevelsComponent]
})
export class LevelsModule {}
