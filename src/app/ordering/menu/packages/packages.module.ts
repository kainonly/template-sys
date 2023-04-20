import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { PackagesComponent } from './packages.component';

const routes: Routes = [
  {
    path: '',
    component: PackagesComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [PackagesComponent]
})
export class PackagesModule {}
