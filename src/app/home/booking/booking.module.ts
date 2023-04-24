import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';

import { BookingComponent } from './booking.component';

const routes: Routes = [
  {
    path: '',
    component: BookingComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes), NzCalendarModule],
  declarations: [BookingComponent]
})
export class BookingModule {}
