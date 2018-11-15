import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { switchMap, map, tap } from 'rxjs/operators';
import { Observable, from } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Charge, Source } from '../models/payment.model';

declare var Stripe: any;

@Injectable()
export class PaymentService {
  readonly api = `${environment.functionsURL}/api`;

  stripe = Stripe('pk_test_IRDQ8S7wm9GcODoXgxFJMX2F');
  elements: any;

  constructor(private http: HttpClient, private afs: AngularFirestore) {
    this.elements = this.stripe.elements();
  }

  ///// PAYMENT ACTIONS ////

  createPayment(
    card: any,
    amount: number,
    email: string,
    name: string,
    description: string,
    metadata: any
  ): Observable<Charge> {
    const url = `${this.api}/payment/`;

    return from<Source>(this.stripe.createSource(card)).pipe(
      switchMap(data => {
        return this.http
          .post<Charge>(url, {
            amount,
            sourceId: data.source.id,
            name,
            email,
            description,
            metadata
          })
          .pipe(tap(response => {
            this.afs.doc(`payment/${response.id}`).set(response);
            console.log(response);
          }));
      })
    );
  }
}
