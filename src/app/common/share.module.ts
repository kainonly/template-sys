import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PicturesModule } from '@common/components/pictures/pictures.module';
import { RichtextModule } from '@common/components/richtext/richtext.module';
import { VideosModule } from '@common/components/videos/videos.module';
import { WpxModule, WpxShareModule } from '@weplanx/ng';
import { WpxMediaModule } from '@weplanx/ng/media';
import { WpxQuickModule } from '@weplanx/ng/quick';
import { WpxTableModule } from '@weplanx/ng/table';
import { WpxUploadModule } from '@weplanx/ng/upload';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';

@NgModule({
  exports: [
    RouterModule,
    WpxModule,
    WpxShareModule,
    WpxTableModule,
    WpxUploadModule,
    WpxMediaModule,
    WpxQuickModule,
    PicturesModule,
    VideosModule,
    RichtextModule,
    NzTimePickerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShareModule {}
