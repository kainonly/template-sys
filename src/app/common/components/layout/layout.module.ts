import { NgModule } from '@angular/core';

import { ShareModule } from '@common/share.module';

import { LayoutComponent } from './layout.component';
import { ProfileModule } from './profile/profile.module';

@NgModule({
  imports: [ShareModule, ProfileModule],
  declarations: [LayoutComponent],
  exports: [LayoutComponent]
})
export class LayoutModule {}
