import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { MarkupsComponent } from './markups.component';

const routes: Routes = [
  {
    path: '',
    component: MarkupsComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [MarkupsComponent]
})
export class MarkupsModule {}
