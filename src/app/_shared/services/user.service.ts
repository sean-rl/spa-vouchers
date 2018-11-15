import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserInfo, User, auth } from 'firebase/app';
import { tap } from 'rxjs/operators';
import { UserAccount } from '../models/user-account.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user$ = new BehaviorSubject<UserAccount>(null);
  private orders$ = new BehaviorSubject<any[]>(null);
  private bookings$ = new BehaviorSubject<any[]>(null);
  private vouchers$ = new BehaviorSubject<any[]>(null);
  private available$ = new BehaviorSubject<boolean>(null);
  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.afAuth.user
      .pipe(
        tap((user: User) => {
          if (user && user.uid) {
            const userDoc$ = this.afs.doc('user/' + user.uid).valueChanges();
            userDoc$.subscribe((userAccount: any) => {
              if (userAccount !== undefined) {
                const bookingsSub = this.afs
                  .collection('booking', ref =>
                    ref.where('email', '==', userAccount.email)
                  )
                  .valueChanges()
                  .pipe(
                    tap((bookings: any[]) => {
                      this.bookings$.next(bookings);
                    })
                  )
                  .subscribe();
                const ordersSub = this.afs
                  .collection('order', ref =>
                    ref.where('email', '==', userAccount.email)
                  )
                  .valueChanges()
                  .pipe(
                    tap((orders: any[]) => {
                      this.orders$.next(orders);
                    })
                  )
                  .subscribe();
                const vouchersSub = this.afs
                  .collection('voucher', ref =>
                    ref.where('recipientEmail', '==', userAccount.email)
                  )
                  .valueChanges()
                  .pipe(
                    tap((vouchers: any[]) => {
                      this.vouchers$.next(vouchers);
                    })
                  )
                  .subscribe();
                this.available$.next(true);
                this.user$.next(userAccount);
              } else {
                const newUserAccount: UserAccount = {
                  displayName: user.displayName,
                  photoURL: user.photoURL,
                  providerId: user.providerId,
                  uid: user.uid,
                  email: user.email,
                  phoneNumber: user.phoneNumber,
                  address: '',
                  name: user.displayName
                };
                this.afs.doc('user/' + user.uid).set(newUserAccount);
              }
            });
          }
        })
      )
      .subscribe();
  }

  updateUserAccount(updateUserAccount: UserAccount) {
    if (updateUserAccount && updateUserAccount.uid) {
      this.afs.doc('user/' + updateUserAccount.uid).update(updateUserAccount);
    }
  }
  isAvailable() {
    return this.available$;
  }

  getUser() {
    return this.user$;
  }

  getBookings() {
    return this.bookings$;
  }

  getVouchers() {
    return this.vouchers$;
  }
  getOrders() {
    return this.orders$;
  }

  loginEmail(username: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(username, password);
  }

  loginGoogle() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  loginFacebook() {
    this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.available$.next(false);
      this.user$.next(undefined);
    });
  }
}
