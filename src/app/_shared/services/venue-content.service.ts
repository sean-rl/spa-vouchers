import { VenueContentDoc } from '../models/venue-content.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { VenueDoc } from './search.service';

@Injectable()
export class VenueContentService {
  private select$: BehaviorSubject<VenueContentDoc> = new BehaviorSubject(null);
  constructor(private afs: AngularFirestore) {}
  Select(venueDash): Observable<VenueContentDoc> {
    const subs = this.afs
      .collection<VenueDoc>('venue', ref => ref.where('dash', '==', venueDash))
      .valueChanges()
      .pipe(
        tap(results => {
          if (results && results.length && results.length === 1) {
            const venueId = results[0].id;
            let venueDetail: VenueContentDoc = { ...results[0] };
            this.afs
              .doc('venue_content/' + venueId)
              .valueChanges()
              .pipe(
                tap(content => {
                  venueDetail = { ...venueDetail, ...content };
                  this.select$.next(venueDetail);
                })
              )
              .subscribe();
            subs.unsubscribe();
          }
        })
      )
      .subscribe();

    return this.select$;
  }
}
