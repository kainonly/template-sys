import { Component } from '@angular/core';

import { NzCalendarMode } from 'ng-zorro-antd/calendar';

@Component({
  selector: 'app-booking-calendar',
  templateUrl: './calendar.component.html'
})
export class CalendarComponent {
  date = new Date();
  mode: NzCalendarMode = 'month';

  panelChange(change: { date: Date; mode: string }): void {
    console.log(change.date, change.mode);
  }
}
