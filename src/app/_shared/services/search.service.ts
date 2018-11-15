// tslint:disable:curly
// tslint:disable:max-line-length
import { Router } from '@angular/router';
import { OUTCODEs, OUTTEXTs } from '../../search/outcodes';
import { SearchResult } from './search.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { tap, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';

export interface SearchFilter {
  type?: string;
  text?: string;
  maxDistance?: number;
  minPrice?: number;
  maxPrice?: number;
  minNights?: number;
  maxNights?: number;
  minPeople?: number;
  maxPeople?: number;
}

export interface VenuePck {
  avail: number[];
  fromDate: string;
  fromPrice: string;
  id: string;
  nights: number;
  people: number;
  toDate: string;
  toPrice: string;
}

export interface VenueDoc {
  id: string;
  addr: string;
  dash: string;
  img: string;
  lat: number;
  lng: number;
  map: string;
  name: string;
  pcks: VenuePck[];
  phne: string;
  rate: number;
  sbid: number;
  street: string;
  town: string;
  region: string;
  country: string;
  postcode: string;
  web: string;
  distance?: number;
  availablepcks: VenuePck[];
  daypcks: VenuePck[];
  breakpcks: VenuePck[];
}
export interface OutcodeDoc {
  out: string;
  lng: number;
  lat: number;
  sector?: string;
  place?: string;
  town?: string;
  region?: string;
  label?: string;
  venuesIn50?: VenueDoc[];
  venues?: VenueDoc[];
  match?: {
    out: boolean;
    sector: boolean;
    place: boolean;
    town: boolean;
    region: boolean;
  };
}
export interface SearchResult {
  type: string;
  tag: string;
  count: number;
  near: number;
  ids: string[];
}

export function getDistanceInMiles(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d * 0.621371;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private Criteria$: BehaviorSubject<any> = new BehaviorSubject(null);

  private searchText$: BehaviorSubject<string> = new BehaviorSubject(null);
  private searchSelected$: BehaviorSubject<any> = new BehaviorSubject(null);
  private searchSelection$: BehaviorSubject<any> = new BehaviorSubject(null);
  private featuredSelection$: BehaviorSubject<any> = new BehaviorSubject(null);
  private maxDistance$: BehaviorSubject<number> = new BehaviorSubject(null);
  private minPrice$: BehaviorSubject<number> = new BehaviorSubject(null);
  private maxPrice$: BehaviorSubject<number> = new BehaviorSubject(null);
  private minNights$: BehaviorSubject<number> = new BehaviorSubject(null);
  private maxNights$: BehaviorSubject<number> = new BehaviorSubject(null);
  private minPeople$: BehaviorSubject<number> = new BehaviorSubject(null);
  private maxPeople$: BehaviorSubject<number> = new BehaviorSubject(null);
  startTime = null;
  endTime = null;

  private allVenue$: BehaviorSubject<VenueDoc[]> = new BehaviorSubject(null);
  private allOutcode$: BehaviorSubject<OutcodeDoc[]> = new BehaviorSubject(
    null
  );

  private filteredVenueByPackage$: BehaviorSubject<
    VenueDoc[]
  > = new BehaviorSubject(null);
  private filteredVenueByText$: BehaviorSubject<
    VenueDoc[]
  > = new BehaviorSubject(null);
  private filteredOutcodeByText$: BehaviorSubject<
    OutcodeDoc[]
  > = new BehaviorSubject(null);
  private filteredOutcodeByTextDistance$: BehaviorSubject<
    any
  > = new BehaviorSubject(null);

  constructor(private afs: AngularFirestore, private router: Router) {
    console.clear();
    this.startTime = new Date().valueOf();
    const outtexts = OUTTEXTs.split('_');
    const outcodes = OUTCODEs.split('_')
      .map(o => {
        const [d, la, ln, s, p, t, r, l] = o
          .replace('!', '|||||')
          .replace(';', '||||')
          .replace(':', '|||')
          .replace('.', '||')
          .split('|');
        // const [d, la, ln, s, p, t, r, l] = o.split('|');
        let rtn: any = {
          out: d,
          lng: (-783 + parseInt(ln, 10)) / 100,
          lat: (4918 + parseInt(la, 10)) / 100
        };
        if (s && outtexts[parseInt(d, 36)])
          rtn = { ...rtn, ...{ out: outtexts[parseInt(d, 36)] } };
        if (s && outtexts[parseInt(s, 36)])
          rtn = { ...rtn, ...{ sector: outtexts[parseInt(s, 36)] } };
        if (p && outtexts[parseInt(p, 36)])
          rtn = { ...rtn, ...{ place: outtexts[parseInt(p, 36)] } };
        if (t && outtexts[parseInt(t, 36)])
          rtn = { ...rtn, ...{ town: outtexts[parseInt(t, 36)] } };
        if (r && outtexts[parseInt(r, 36)])
          rtn = { ...rtn, ...{ region: outtexts[parseInt(r, 36)] } };
        if (l && outtexts[parseInt(l, 36)])
          rtn = { ...rtn, ...{ label: outtexts[parseInt(l, 36)] } };
        return rtn;
      })
      .sort((a, b) => b.out.length - a.out.length);

    this.startTime = new Date().valueOf();
    this.afs
      .collection('venue')
      .valueChanges()
      .subscribe((venues: VenueDoc[]) => {
        console.log(
          'load venues time' + (new Date().valueOf() - this.startTime)
        );
        const outcodesWithVenueDistances = outcodes.map(outcode => {
          const venueDistances = venues
            .reduce((accVenues, venue) => {
              const distance =
                Math.abs(Math.abs(venue.lat) - Math.abs(outcode.lat)) < 0.73 &&
                Math.abs(Math.abs(venue.lng) - Math.abs(outcode.lng)) < 1.38
                  ? getDistanceInMiles(
                      venue.lat,
                      venue.lng,
                      outcode.lat,
                      outcode.lng
                    )
                  : 999;
              return distance < 50
                ? [...accVenues, { id: venue.id, distance }]
                : accVenues;
            }, [])
            .sort((v1, v2) => v1.distance - v2.distance);
          return { ...outcode, venuesIn50: venueDistances };
        });
        this.allOutcode$.next(outcodesWithVenueDistances);
        this.allVenue$.next(venues);
        this.Watchers();
        this.Distance(50);
        console.log(
          'load outcode distance time' + (new Date().valueOf() - this.startTime)
        );
      });
  }
  Watchers() {

    const processPricePeopleNights = combineLatest(
      this.allVenue$,
      this.minPrice$,
      this.minPeople$,
      this.minNights$,
      this.maxPrice$,
      this.maxPeople$,
      this.maxNights$
    )
      .pipe(
        tap(
          ([
            allVenues,
            minPrice,
            minPeople,
            minNights,
            maxPrice,
            maxPeople,
            maxNights
          ]) => {
            const startTime = new Date().valueOf();
            try {
              const filteredVenues = allVenues
                .map(venue => {
                  let filteredPacks = venue.pcks.sort(
                    (a, b) => parseFloat(a.fromPrice) - parseFloat(b.fromPrice)
                  );
                  if (typeof minPrice === 'number' && minPrice > 0)
                    filteredPacks = filteredPacks.filter(
                      pack =>
                        parseFloat(pack.toPrice) &&
                        parseFloat(pack.toPrice) >= minPrice
                          ? true
                          : false
                    );
                  if (typeof maxPrice === 'number' && maxPrice < 9999)
                    filteredPacks = filteredPacks.filter(
                      pack =>
                        parseFloat(pack.fromPrice) &&
                        parseFloat(pack.fromPrice) <= maxPrice
                          ? true
                          : false
                    );
                  if (typeof minNights === 'number' && minNights > 0)
                    filteredPacks = filteredPacks.filter(
                      pack => (pack.nights >= minNights ? true : false)
                    );
                  if (typeof maxNights === 'number' && maxNights < 99)
                    filteredPacks = filteredPacks.filter(
                      pack => (pack.nights <= maxNights ? true : false)
                    );
                  if (typeof minPeople === 'number' && minPeople > 0)
                    filteredPacks = filteredPacks.filter(
                      pack => (pack.people >= minPeople ? true : false)
                    );
                  if (typeof maxPeople === 'number' && maxPeople < 99)
                    filteredPacks = filteredPacks.filter(
                      pack => (pack.people <= maxPeople ? true : false)
                    );
                  return {
                    ...venue,
                    availablepcks: filteredPacks,
                    daypcks: filteredPacks.filter(p => p.nights === 0),
                    breakpcks: filteredPacks.filter(p => p.nights > 0)
                  };
                })
                .filter(
                  v =>
                    typeof minNights === 'number' && minNights > 0
                      ? v.breakpcks.length > 0
                      : typeof maxNights === 'number' && maxNights === 0
                        ? v.daypcks.length > 0
                        : v.availablepcks.length > 0
                );
              this.filteredVenueByPackage$.next(filteredVenues);
            } catch (err) {
              console.log(err);
              console.assert(true);
            }
            console.log(
              'venue price, night, people filter time' +
                (new Date().valueOf() - startTime)
            );
          }
        )
      )
      .subscribe();

    const processSearchTextVenues = combineLatest(
      this.allVenue$,
      this.searchText$
    )
      .pipe(
        tap(([filteredVenuesByPackage, text]) => {
          if (text && typeof text === 'string' && text.trim().length > 1) {
            this.featuredSelection$.next(null);

            const startTime = new Date().valueOf();
            try {
              let filteredVenues = filteredVenuesByPackage.filter(v => {
                if (!v || !v.name || typeof v.name !== 'string') return false;
                if (v.name.toLowerCase().indexOf(text.toLowerCase()) === 0) {
                  return true;
                }
              });
              if (filteredVenues.length === 0) {
                filteredVenues = filteredVenuesByPackage.filter(v => {
                  if (!v || !v.name || typeof v.name !== 'string') return false;
                  if (v.name.toLowerCase().indexOf(text.toLowerCase()) > 0) {
                    return true;
                  }
                });
              }
              this.filteredVenueByText$.next(filteredVenues);
            } catch (err) {
              console.log(err);
              console.assert(true);
            }
            console.log(
              'venue text filter time' + (new Date().valueOf() - startTime)
            );
          } else if (text && typeof text === 'string' && text.trim().length > 0) {
            this.featuredSelection$.next(null);
          } else {
            this.allVenue$.pipe(
              take(1),
              tap((featured: any[]) => {
                this.featuredSelection$.next(featured.slice(0, 5));
              })
            ).subscribe();
          }
        })
      )
      .subscribe();

    const processSearchTextOutcodes = combineLatest(
      this.allOutcode$,
      this.searchText$
    )
      .pipe(
        // debounce(()=>interval(500)),
        tap(([allOutcodes, text]) => {
          if (allOutcodes && allOutcodes.length > 0) {
            const startTime = new Date().valueOf();
            const searchText =
              typeof text === 'string' ? text.toUpperCase() : '';
            const searchOut3 = searchText.slice(0, 3);
            const searchOut4 = searchText.slice(0, 4);
            const searchLen = searchText.length;
            const fields = [
              {
                key: 'region',
                active: searchLen > 1 && searchLen < 5,
                tags: []
              },
              {
                key: 'sector',
                active: searchLen > 1 && searchLen < 5,
                tags: []
              },
              {
                key: 'out',
                active: searchLen === 2 || searchLen === 3 || searchLen === 4,
                tags: []
              },
              {
                key: 'place',
                active: searchLen > 2,
                tags: []
              },
              {
                key: 'town',
                active: searchLen > 2,
                tags: []
              }
            ].filter(field => field.active);
            try {
              let add3LetterOutcodes = true;
              const filteredOutcodes = allOutcodes.reduce(
                (accOutcodes, outcode) => {
                  let addCode = false;
                  const matches = {
                    out: false,
                    sector: false,
                    place: false,
                    town: false,
                    region: false
                  };
                  for (let fldIndex = 0; fldIndex < fields.length; fldIndex++) {
                    const field = fields[fldIndex];
                    if (outcode[field.key]) {
                      const fieldValue: string = outcode[field.key]
                        ? outcode[field.key]
                        : '';
                      if (field.key !== 'out') {
                        if (
                          fieldValue.toUpperCase().indexOf(searchText) === 0
                        ) {
                          addCode = true;
                          matches[field.key] = true;
                        }
                      }
                      if (field.key === 'label') {
                        if (
                          fieldValue.toUpperCase().indexOf(searchText) === 0 ||
                          fieldValue.toUpperCase().indexOf(', ' + searchText) >
                            -1
                        ) {
                          addCode = true;
                          matches[field.key] = true;
                        }
                      } else {
                        if (
                          outcode[field.key].length !== 4 &&
                          fieldValue.indexOf(searchText) === 0
                        ) {
                          addCode = true;
                          add3LetterOutcodes = false;
                          matches[field.key] = true;
                        } else if (
                          (add3LetterOutcodes &&
                            searchLen === 4 &&
                            fieldValue === searchOut4) ||
                          (add3LetterOutcodes &&
                            searchLen === 3 &&
                            fieldValue.indexOf(searchOut3) === 0) ||
                          (add3LetterOutcodes &&
                            searchLen === 4 &&
                            (fieldValue + ' ').indexOf(searchOut3 + ' ') === 0)
                        ) {
                          addCode = true;
                          matches[field.key] = true;
                        }
                      }
                    }
                  }
                  return addCode
                    ? [...accOutcodes, { ...outcode, match: matches }]
                    : accOutcodes;
                },
                []
              );
              this.filteredOutcodeByText$.next(filteredOutcodes);
            } catch (err) {
              console.log(err);
              console.assert(true);
            }
            console.log(
              'outcode text filter time' + (new Date().valueOf() - startTime)
            );
          }
        })
      )
      .subscribe();

    const processMaxDistance = combineLatest(
      this.filteredVenueByPackage$,
      this.filteredOutcodeByText$,
      this.maxDistance$,
      this.searchSelected$
    )
      .pipe(
        tap(([allVenues, filteredOutcodes, maxDistance, searchSelected]) => {
          console.log(filteredOutcodes, maxDistance, maxDistance < 51);
          if (filteredOutcodes && maxDistance && maxDistance < 51) {
            const startTime = new Date().valueOf();
            const fields = [
              {
                key: 'region'
              },
              {
                key: 'sector'
              },
              {
                key: 'out'
              },
              {
                key: 'place'
              },
              {
                key: 'town'
              }
            ];
            try {
              const filteredDistanceOutcodes = filteredOutcodes
                .reduce((accOutcodes, filteredOutcode: OutcodeDoc) => {
                  const venueDistances = filteredOutcode.venuesIn50.filter(
                    v =>
                      v.distance
                        ? v.distance <= (maxDistance ? maxDistance : 50)
                        : false
                  );
                  if (
                    !(
                      venueDistances &&
                      venueDistances.length &&
                      venueDistances.length > 0
                    )
                  ) {
                    return accOutcodes;
                  } else {
                    let rtn = [];
                    const venueDetailDistance = venueDistances.reduce(
                      (accVenues, venueDistance) => {
                        const venueDetail = allVenues.find(
                          venue => venue.id === venueDistance.id
                        );
                        return venueDetail !== undefined
                          ? [...accVenues, { ...venueDistance, ...venueDetail }]
                          : accVenues;
                      },
                      []
                    );
                    fields.forEach(field => {
                      if (
                        filteredOutcode['match'] &&
                        filteredOutcode['match'][field.key]
                      ) {
                        try {
                          const updatedOutcode = {
                            tag:
                              filteredOutcode[field.key] +
                              (field.key === 'sector' && filteredOutcode.place
                                ? ' : ' + filteredOutcode.place
                                : '') +
                              (field.key === 'out' && filteredOutcode.town
                                ? ' : ' + filteredOutcode.town
                                : '') +
                              (field.key === 'out' && filteredOutcode.label
                                ? ' : ' + filteredOutcode.label
                                : ''),
                            type: field.key,
                            count: venueDetailDistance.length,
                            near: venueDetailDistance[0]
                              ? venueDetailDistance[0].distance
                              : null,
                            venues: venueDetailDistance
                          };

                          rtn = [...rtn, updatedOutcode];
                          if (
                            searchSelected &&
                            searchSelected.tag &&
                            updatedOutcode.tag.indexOf(searchSelected.tag) ===
                              0 &&
                            searchSelected.type === field.key
                          ) {
                            console.log('found selected');
                            this.searchSelection$.next(updatedOutcode);
                          }
                        } catch (err) {
                          console.log(err);
                        }
                      }
                    });

                    return [...accOutcodes, ...rtn];
                  }
                }, [])
                .sort(function(tag1, tag2) {
                  if (tag1.count > tag2.count) return -1;
                  if (tag1.count < tag2.count) return 1;
                  if (tag1.tag > tag2.tag) return 1;
                  if (tag1.tag < tag2.tag) return -1;
                });
              this.filteredOutcodeByTextDistance$.next(
                filteredDistanceOutcodes
              );
            } catch (err) {
              console.log(err);
              console.assert(true);
            }
            console.log(
              'max distance time ' + (new Date().valueOf() - startTime)
            );
          }
        })
      )
      .subscribe();
    const processCriteria = combineLatest(
      this.searchSelected$,
      this.searchText$,
      this.maxDistance$,
      this.minPrice$,
      this.minPeople$,
      this.minNights$,
      this.maxPrice$,
      this.maxPeople$,
      this.maxNights$
    )
      .pipe(
        tap(
          ([
            searchSelected,
            searchText,
            maxDistance,
            minPrice,
            minPeople,
            minNights,
            maxPrice,
            maxPeople,
            maxNights
          ]) => {
            const startTime = new Date().valueOf();
            try {
              let criteria: any = {
                maxDistance: 50,
                minPrice: 0,
                maxPrice: 9999,
                minNights: 0,
                maxNights: 99,
                minPeople: 0,
                maxPeople: 99
              };

              if (
                maxDistance !== undefined &&
                typeof maxDistance === 'number' &&
                maxDistance > 0
              )
                criteria = { ...criteria, maxDistance };
              if (
                minPrice !== undefined &&
                typeof minPrice === 'number' &&
                minPrice > 0
              )
                criteria = { ...criteria, minPrice };
              if (
                maxPrice !== undefined &&
                typeof maxPrice === 'number' &&
                maxPrice < 9999
              )
                criteria = { ...criteria, maxPrice };
              if (
                minNights !== undefined &&
                typeof minNights === 'number' &&
                minNights >= 0
              )
                criteria = { ...criteria, minNights };
              if (
                maxNights !== undefined &&
                typeof maxNights === 'number' &&
                maxNights <= 99
              )
                criteria = { ...criteria, maxNights };
              if (
                minPeople !== undefined &&
                typeof minPeople === 'number' &&
                minPeople >= 0
              )
                criteria = { ...criteria, minPeople };
              if (
                maxPeople !== undefined &&
                typeof maxPeople === 'number' &&
                maxPeople <= 99
              )
                criteria = { ...criteria, maxPeople };
              if (
                searchText !== undefined &&
                typeof searchText === 'string' &&
                searchText !== ''
              )
                criteria = { ...criteria, searchText };

              this.Criteria$.next(criteria);
            } catch (err) {
              console.log(err);
              console.assert(true);
            }
            console.log(
              'max distance time ' + (new Date().valueOf() - startTime)
            );
          }
        )
      )
      .subscribe();
  }
  Text(value: string) {
    this.searchText$.next(value);
    if (!value || value === '') {
      this.searchSelected$.next(null);
      this.searchSelection$.next(null);
    }
  }
  Distance(value: number) {
    this.maxDistance$.next(value);
  }
  MinPrice(value: number) {
    this.minPrice$.next(value);
  }
  MaxPrice(value: number) {
    this.maxPrice$.next(value);
  }
  MinNights(value: number) {
    this.minNights$.next(value);
  }
  MaxNights(value: number) {
    this.maxNights$.next(value);
  }
  MinPeople(value: number) {
    this.minPeople$.next(value);
  }
  MaxPeople(value: number) {
    this.maxPeople$.next(value);
  }
  Select(value: SearchResult) {
    console.log('SELECTED', value);
    this.searchSelected$.next(value);
    this.searchSelection$.next(value);
    this.router.navigate([], {
      queryParams: {
        searchType: value.type,
        searchTag:
          value.type === 'out' || value.type === 'sector'
            ? value.tag
            : value.tag
      }
    });
  }
  SilentSelect(value: SearchResult) {
    this.searchSelected$.next(value);
    this.searchSelection$.next(value);
  }
  Criteria() {
    return this.Criteria$;
  }
  Selection() {
    return this.searchSelection$;
  }
  Featured() {
    return this.featuredSelection$;
  }
  AutoCompleteLocations() {
    return this.filteredOutcodeByTextDistance$;
  }
  AutoCompleteVenues() {
    return this.filteredVenueByText$;
  }
}
