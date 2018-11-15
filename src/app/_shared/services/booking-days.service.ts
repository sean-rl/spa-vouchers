import { Injectable } from '@angular/core';

export function addDays(theDate: Date, days): Date {
  return new Date(theDate.getTime() + days * 86400000);
}

export interface CalendarMonth {
  year: number;
  month: number;
  offset: number;
  days: Date[];
}
@Injectable({
  providedIn: 'root'
})
export class VenueBookingDaysService {
  private calendar: CalendarMonth[] = [];
  constructor() {
    const nowDate = new Date();
    const yr = nowDate.getUTCFullYear();
    const mth = nowDate.getUTCMonth();
    const endyr = mth < 3 ? yr : yr + 1;
    const endmth = mth < 3 ? mth + 9 : mth - 2;
    const firstDate = new Date(
      yr,
      mth,
      1,
      -(nowDate.getTimezoneOffset() / 60),
      0,
      0,
      0
    );
    const finalDate = new Date(
      endyr,
      endmth,
      1,
      -(nowDate.getTimezoneOffset() / 60),
      0,
      0,
      0
    );
    let d = firstDate;
    let days = [];
    while (d < finalDate) {
      days = [...days, d];

      const nextDay = addDays(d, 1);
      if (nextDay.getDate() === 1) {
        const dayId = days[0].getUTCDay();
        this.calendar = [
          ...this.calendar,
          {
            year: d.getUTCFullYear(),
            month: d.getUTCMonth(),
            offset: dayId > 0 ? dayId - 1 : 6,
            days
          }
        ];
        days = [];
      }
      d = nextDay;
    }
  }
  getCalendar(): CalendarMonth[] {
    return this.calendar;
  }
}
