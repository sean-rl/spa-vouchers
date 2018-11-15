import { VenuePck } from '../../../_shared/services/search.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VenuePackageService } from '../../../_shared/services/venue-package.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'venue-booking-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})
export class VenueBookingPackageComponent implements OnInit {
  @Input()
  packageId: string;
  package$: Observable<any>;

  constructor(private venuePackage: VenuePackageService) {}

  ngOnInit() {
    this.package$ = this.venuePackage.Select(this.packageId);
  }
}
