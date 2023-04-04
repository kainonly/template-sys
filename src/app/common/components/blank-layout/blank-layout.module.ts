import { NgModule } from '@angular/core';

import { ShareModule } from '@common/share.module';

import { BlankLayoutComponent } from './blank-layout.component';

@NgModule({
  imports: [ShareModule],
  declarations: [BlankLayoutComponent],
  exports: [BlankLayoutComponent]
})
export class BlankLayoutModule {}
