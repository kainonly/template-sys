import { NgModule } from '@angular/core';

import { SidenavModule } from '@common/components/layout/sidenav/sidenav.module';
import { ShareModule } from '@common/share.module';

import { LayoutComponent } from './layout.component';
import { ProfileModule } from './profile/profile.module';

@NgModule({
  imports: [ShareModule, SidenavModule, ProfileModule],
  declarations: [LayoutComponent],
  exports: [LayoutComponent]
})
export class LayoutModule {}
