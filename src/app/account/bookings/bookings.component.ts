import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'account-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class AccountBookingsComponent implements OnInit {
@Input() bookings;
  constructor() { }

  ngOnInit() {
  }

}
