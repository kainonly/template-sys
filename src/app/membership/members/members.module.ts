import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { MembersComponent } from './members.component';

const routes: Routes = [
  {
    path: '',
    component: MembersComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [MembersComponent]
})
export class MembersModule {}
