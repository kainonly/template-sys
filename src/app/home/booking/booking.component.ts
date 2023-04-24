import { Component } from '@angular/core';

import { NzCalendarMode } from 'ng-zorro-antd/calendar';

@Component({
  selector: 'app-home-booking',
  templateUrl: './booking.component.html'
})
export class BookingComponent {
  date = new Date(2012, 11, 21);
  mode: NzCalendarMode = 'month';

  panelChange(change: { date: Date; mode: string }): void {
    console.log(change.date, change.mode);
  }
}
