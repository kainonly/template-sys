import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { LevelFormComponent } from './level-form/level-form.component';
import { ListsComponent } from './lists.component';

const routes: Routes = [
  {
    path: '',
    component: ListsComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [ListsComponent, LevelFormComponent]
})
export class ListsModule {}
