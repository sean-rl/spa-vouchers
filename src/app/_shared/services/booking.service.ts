import { UserService } from './user.service';
import { VenueBooking } from '../models/booking.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserAccount } from '../models/user-account.model';

@Injectable({
  providedIn: 'root'
})
export class VenueBookingService {
  venueBooking$ = new BehaviorSubject<VenueBooking>(null);
  private venueBooking;
  private user: UserAccount;
  constructor(private afs: AngularFirestore, private userService: UserService) {
    this.userService.getUser().subscribe(userAccount => {
      this.user = userAccount;
      if (this.venueBooking && this.venueBooking.name === '') {
        this.venueBooking.name =
          this.user && this.user.name ? this.user.name : '';
      }
      if (this.venueBooking && this.venueBooking.phoneNumber === '') {
        this.venueBooking.phone =
          this.user && this.user.phoneNumber ? this.user.phoneNumber : '';
      }
      if (this.venueBooking && this.venueBooking.email === '') {
        this.venueBooking.email =
          this.user && this.user.email ? this.user.email : '';
      }
    });
  }

  Create(
    venueId: string,
    venueName: string,
    venueAddr: string,
    venuePack: string,
    packageId: string
  ): Observable<VenueBooking> {
    this.venueBooking = {
      id: null,
      venueId: venueId,
      venueName: venueName,
      venueAddr: venueAddr,
      venuePack: venuePack,
      packageId: packageId,
      name: this.user && this.user.name ? this.user.name : '',
      phone: this.user && this.user.phoneNumber ? this.user.phoneNumber : '',
      email: this.user && this.user.email ? this.user.email : '',
      date: null,
      bookingValue: 0,
      voucher: '',
      voucherValue: 0,
      request: '',
      balanceValue: 0,
      valid: false,
      validation: [],
      created: new Date(),
      updated: null,
      submitted: null
    };
    this.venueBooking$.next(this.venueBooking);
    return this.venueBooking$;
  }
  Select(bookingId: string): Observable<VenueBooking> {
    this.afs
      .doc('booking/' + bookingId)
      .valueChanges()
      .pipe(
        tap((venueBooking: VenueBooking) => {
          this.venueBooking = venueBooking;
          this.venueBooking$.next(this.venueBooking);
        })
      );
    return this.venueBooking$;
  }
  Update(venueBooking: Partial<VenueBooking>) {
    this.venueBooking = {
      ...this.venueBooking,
      ...venueBooking,
      updated: new Date()
    };
    this.venueBooking$.next(this.venueBooking);
    this.Validate();
    this.venueBooking$.next(this.venueBooking);
  }
  Submit() {
    this.Validate();
    if (this.venueBooking.valid) {
      if (this.venueBooking.id === null) {
        const bookingId = this.afs.createId();
        this.venueBooking.id = bookingId;
        this.venueBooking.submitted = new Date();

        this.afs
          .doc('booking/' + bookingId)
          .set(this.venueBooking)
          .then(venueBooking => {
            this.venueBooking$.next(this.venueBooking);
          });
      } else {
        this.afs.doc('booking/' + this.venueBooking.id).set(this.venueBooking);
      }
    }
  }
  Delete(): Observable<boolean> {
    return Observable.create(true);
  }
  private Validate() {
    let valid = false;
    let validation = [];
    if (
      this.venueBooking.name !== '' &&
      this.venueBooking.date !== null &&
      (this.venueBooking.email !== '' || this.venueBooking.phone !== '')
    ) {
      valid = true;
      validation = [];
    } else {
      valid = false;
    }
    this.venueBooking = { ...this.venueBooking, valid, validation };
    this.venueBooking$.next(this.venueBooking);
  }
}
