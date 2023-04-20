import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/ng';
import { WpxMediaModule } from '@weplanx/ng/media';
import { WpxQuickModule } from '@weplanx/ng/quick';
import { WpxUploadModule } from '@weplanx/ng/upload';

import { FormComponent } from './form/form.component';
import { TagFormComponent } from './tag-form/tag-form.component';
import { VideosInputComponent } from './videos-input.component';
import { VideosComponent } from './videos.component';

@NgModule({
  imports: [WpxModule, WpxShareModule, WpxUploadModule, WpxMediaModule, WpxQuickModule],
  declarations: [VideosComponent, VideosInputComponent, FormComponent, TagFormComponent],
  exports: [VideosComponent, VideosInputComponent, FormComponent, TagFormComponent]
})
export class VideosModule {}
