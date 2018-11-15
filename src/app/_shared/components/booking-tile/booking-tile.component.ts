import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'booking-tile',
  templateUrl: './booking-tile.component.html',
  styleUrls: ['./booking-tile.component.scss']
})
export class BookingTileComponent implements OnInit {
  @Input()
  booking;

  constructor() {

  }

  ngOnInit() {

  }
}
