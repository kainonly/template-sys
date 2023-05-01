import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { JournalComponent } from './journal.component';

const routes: Routes = [
  {
    path: '',
    component: JournalComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [JournalComponent]
})
export class JournalModule {}
