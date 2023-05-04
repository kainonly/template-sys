import { NgModule } from '@angular/core';

import { FormComponent } from '@common/components/pictures/form/form.component';
import { TagFormComponent } from '@common/components/pictures/tag-form/tag-form.component';
import { TagsComponent } from '@common/components/pictures/tags/tags.component';
import { WpxModule, WpxShareModule } from '@weplanx/ng';
import { WpxMediaModule } from '@weplanx/ng/media';
import { WpxUploadModule } from '@weplanx/ng/upload';

import { PicturesInputComponent } from './pictures-input.component';
import { PicturesComponent } from './pictures.component';

@NgModule({
  imports: [WpxModule, WpxShareModule, WpxUploadModule, WpxMediaModule],
  declarations: [PicturesComponent, PicturesInputComponent, FormComponent, TagsComponent, TagFormComponent],
  exports: [PicturesComponent, PicturesInputComponent]
})
export class PicturesModule {}
