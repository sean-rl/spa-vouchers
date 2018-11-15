import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, take } from 'rxjs/operators';

@Injectable()
export class VenuePackageService {
  constructor(private afs: AngularFirestore) {}
  Select(packageId): Observable<any> {
    const package$ = new BehaviorSubject<any>(null);
    this.afs
      .doc('packages/' + packageId)
      .valueChanges()
      .pipe(
        take(1),
        tap(pck => {
          const rtnPck = {
            ...pck,
            pricing: pck['products'].reduce(
              (acc, product) => {
                if (
                  product &&
                  product.days_available &&
                  Array.isArray(product.days_available) &&
                  product.price > 0
                ) {
                  const rtn = [...acc];
                  product.days_available.forEach(element => {
                    rtn[element] = product['price'];
                  });
                  return rtn;
                }
                return acc;
              },
              [null, null, null, null, null, null, null]
            )
          };

          package$.next(rtnPck);
        })
      )
      .subscribe();

    return package$;
  }
}
