import { NgModule } from '@angular/core';

import { ShareModule } from '@common/share.module';

import { AuthorizedComponent } from './authorized/authorized.component';
import { UnauthorizeComponent } from './unauthorize/unauthorize.component';

@NgModule({
  imports: [ShareModule],
  declarations: [AuthorizedComponent, UnauthorizeComponent],
  exports: [AuthorizedComponent, UnauthorizeComponent]
})
export class ResultModule {}
