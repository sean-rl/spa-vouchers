import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VenueBooking } from '../../../_shared/models/booking.model';

@Component({
  selector: 'venue-booking-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class VenueBookingDetailComponent implements OnInit {
  @Input() venueBooking;
  @Output() updated = new EventEmitter<VenueBooking>();
  constructor() {}

  ngOnInit() {

  }
}
