import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { UpgradeComponent } from './upgrade.component';

const routes: Routes = [
  {
    path: '',
    component: UpgradeComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [UpgradeComponent]
})
export class UpgradeModule {}
