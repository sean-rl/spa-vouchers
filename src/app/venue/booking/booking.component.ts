import { VenueBookingService } from '../../_shared/services/booking.service';
import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { VenueBookingDaysService, addDays } from '../../_shared/services/booking-days.service';
import { Observable } from 'rxjs';
import { VenueBooking } from '../../_shared/models/booking.model';

@Component({
  selector: 'venue-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class VenueBookingComponent implements OnInit {
  @Input()
  selectedPackage;
  @Input()
  venue;
  @Input()
  venueName;
  @Input()
  venueAddr;
  @Input()
  venuePack;
  @Input()
  id: string = null;
  venueBooking$: Observable<VenueBooking>;

  constructor(private venueBookingService: VenueBookingService) {}

  ngOnInit() {
    this.createBooking();
  }

  setBookingDate(date: Date) {
    this.venueBookingService.Update({
      date
    });
  }
  setBookingValue(bookingValue: number) {
    this.venueBookingService.Update({
      bookingValue
    });
  }
  setDetail(updated: VenueBooking) {
    this.venueBookingService.Update(updated);
  }
  checkValid() {}
  submitBooking() {
    this.venueBookingService.Submit();
  }
  createBooking() {
    this.venueBooking$ = this.venueBookingService.Create(
      this.venue,
      this.venueName,
      this.venueAddr,
      this.venuePack,
      this.selectedPackage.id
    );
  }
}
