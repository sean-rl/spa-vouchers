import { SearchService, VenueDoc } from '../../_shared/services/search.service';
import { Component, OnInit, HostBinding } from '@angular/core';
import { tap } from 'rxjs/operators';
// import {
//   trigger,
//   transition,
//   query,
//   style,
//   stagger,
//   animate,
//   state
// } from '@angular/animations';

@Component({
  selector: 'search-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
  // animations: [

  //   trigger('gridAnimation', [
  //     transition(':enter', [
  //       query('venue-tile, form', [
  //         style({opacity: 0}),
  //         stagger(50, [
  //           animate(250, style({ opacity: 1, transform: 'none' }))
  //         ])
  //       ])
  //     ])
  //   ]),
  //   trigger('venueAnimation', [
  //     transition(':enter, * => 0, * => -1', []),
  //     transition(':increment', [
  //       query(':enter', [
  //         style({ opacity: 0, width: '0px' }),
  //         stagger(50, [
  //           animate(250, style({ opacity: 1, width: '*' })),
  //         ]),
  //       ], { optional: true })
  //     ]),
  //     transition(':decrement', [
  //       query(':leave', [
  //         stagger(50, [
  //           animate(250, style({ opacity: 0, width: '0px' })),
  //         ]),
  //       ])
  //     ]),
  //   ])
  // ]
})
export class SearchResultsComponent implements OnInit {
  // @HostBinding('@gridAnimation')
  searchVenues: any;
  featuredVenues: any;
  constructor(public search: SearchService) {}

  ngOnInit() {
    const watchVenues = this.search
      .Selection()
      .pipe(
        tap(selected => {
          this.searchVenues = selected && selected.venues ? selected.venues : [];
          console.log(selected);
        })
      )
      .subscribe();
    const watchFeatured = this.search
      .Featured()
      .pipe(
        tap(featured => {
          this.featuredVenues = featured ? featured : [];
          console.log(featured);
        })
      )
      .subscribe();
  }

  trackByVenues(index: number, venue: VenueDoc): string {
    return venue.id;
  }
}
