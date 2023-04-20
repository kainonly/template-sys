import { NgModule } from '@angular/core';

import { ShareModule } from '@common/share.module';

import { SidenavComponent } from './sidenav.component';

@NgModule({
  imports: [ShareModule],
  declarations: [SidenavComponent],
  exports: [SidenavComponent]
})
export class SidenavModule {}
