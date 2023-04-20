import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { MethodsComponent } from './methods.component';

const routes: Routes = [
  {
    path: '',
    component: MethodsComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [MethodsComponent]
})
export class MethodsModule {}
