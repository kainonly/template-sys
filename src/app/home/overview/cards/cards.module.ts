import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { CardsComponent } from './cards.component';

const routes: Routes = [
  {
    path: '',
    component: CardsComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [CardsComponent]
})
export class CardsModule {}
