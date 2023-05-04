import { NgModule } from '@angular/core';

import { TagsComponent } from '@common/components/videos/tags/tags.component';
import { WpxModule, WpxShareModule } from '@weplanx/ng';
import { WpxMediaModule } from '@weplanx/ng/media';
import { WpxUploadModule } from '@weplanx/ng/upload';

import { FormComponent } from './form/form.component';
import { TagFormComponent } from './tag-form/tag-form.component';
import { VideosInputComponent } from './videos-input.component';
import { VideosComponent } from './videos.component';

@NgModule({
  imports: [WpxModule, WpxShareModule, WpxUploadModule, WpxMediaModule],
  declarations: [VideosComponent, VideosInputComponent, FormComponent, TagsComponent, TagFormComponent],
  exports: [VideosComponent, VideosInputComponent]
})
export class VideosModule {}
