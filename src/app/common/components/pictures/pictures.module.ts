import { NgModule } from '@angular/core';

import { FormComponent } from '@common/components/pictures/form/form.component';
import { TagFormComponent } from '@common/components/pictures/tag-form/tag-form.component';
import { WpxModule, WpxShareModule } from '@weplanx/ng';
import { WpxMediaModule } from '@weplanx/ng/media';
import { WpxQuickModule } from '@weplanx/ng/quick';
import { WpxUploadModule } from '@weplanx/ng/upload';

import { PicturesInputComponent } from './pictures-input.component';
import { PicturesComponent } from './pictures.component';

@NgModule({
  imports: [WpxModule, WpxShareModule, WpxUploadModule, WpxMediaModule, WpxQuickModule],
  declarations: [PicturesComponent, PicturesInputComponent, FormComponent, TagFormComponent],
  exports: [PicturesComponent, PicturesInputComponent, FormComponent, TagFormComponent]
})
export class PicturesModule {}
