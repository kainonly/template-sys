import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { TypesComponent } from './types.component';

const routes: Routes = [
  {
    path: '',
    component: TypesComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [TypesComponent]
})
export class TypesModule {}
