import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { AreasComponent } from './areas.component';

const routes: Routes = [
  {
    path: '',
    component: AreasComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [AreasComponent]
})
export class AreasModule {}
