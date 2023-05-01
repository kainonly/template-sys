import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';

import { BookingComponent } from './booking.component';
import { CalendarComponent } from './calendar/calendar.component';

const routes: Routes = [
  {
    path: '',
    component: BookingComponent,
    children: [
      {
        path: 'calendar',
        component: CalendarComponent,
        data: {
          breadcrumb: $localize`预订日历`
        }
      },
      { path: '', redirectTo: 'calendar', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes), NzCalendarModule],
  declarations: [BookingComponent, CalendarComponent]
})
export class BookingModule {}
