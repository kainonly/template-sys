import { NgModule } from '@angular/core';

import { ShopFormComponent } from '@common/components/shop-form/shop-form.component';
import { ShareModule } from '@common/share.module';

@NgModule({
  imports: [ShareModule],
  declarations: [ShopFormComponent],
  exports: [ShopFormComponent]
})
export class ShopFormModule {}
