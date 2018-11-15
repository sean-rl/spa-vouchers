import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {
  addDays,
  CalendarMonth,
  VenueBookingDaysService
} from '../../../_shared/services/booking-days.service';

@Component({
  selector: 'venue-booking-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class VenueBookingCalendarComponent implements OnInit {
  @Input()
  selectedPackage;
  @Input()
  selectedDate = null;
  @Output()
  dateSelected = new EventEmitter<Date>();
  @Output()
  valueSelected = new EventEmitter<number>();

  idxMonth = 0;
  nowDate = addDays(new Date(), 5);
  calendar: CalendarMonth[];
  month: CalendarMonth;
  constructor(private days: VenueBookingDaysService) {}

  ngOnInit() {
    this.calendar = this.days.getCalendar();
    this.month = this.calendar[this.idxMonth];
  }
  nextMonth() {
    this.idxMonth = this.idxMonth + 1;
    this.month = this.calendar[this.idxMonth];
  }
  prevMonth() {
    this.idxMonth = this.idxMonth - 1;
    this.month = this.calendar[this.idxMonth];
  }
  getDayPrice(forDate: Date): number {
    const dayId = forDate.getUTCDay();
    const weekday = dayId > 0 ? dayId - 1 : 6;
    return this.selectedPackage.pricing[weekday];
  }
  getMonthOffsetSpaces() {
    return [0, 1, 2, 3, 4, 5, 6].slice(0, this.month.offset);
  }
}
