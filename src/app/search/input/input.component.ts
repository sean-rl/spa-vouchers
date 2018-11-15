import { tap, startWith, take } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchService } from '../../_shared/services/search.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'search-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class SearchInputComponent implements OnInit {
  searchControl = new FormControl();
  criteria: any;
  activeColumns = 4;
  activeGutter = '10px';
  initialized = false;

  showFilters = true;

  autoCompleteLocations: any;
  autoCompleteVenues: any;
  selectedLocation: any;
  screenSize: string;
  constructor(
    public search: SearchService,
    private route: ActivatedRoute,
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {
    const watchSizes = [
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ];
    breakpointObserver.observe(watchSizes).subscribe(result => {
      if (result.breakpoints[Breakpoints.XSmall]) {
        this.screenSize = '' + 'xs';
      }
      if (result.breakpoints[Breakpoints.Small]) {
        this.screenSize = 'sm';
      }
      if (result.breakpoints[Breakpoints.Medium]) {
        this.screenSize = 'md';
      }
      if (result.breakpoints[Breakpoints.Large]) {
        this.screenSize = 'lg';
      }
      if (result.breakpoints[Breakpoints.XLarge]) {
        this.screenSize = 'xl';
      }
    });
  }

  displaySearchSelectionFn(searchValue?: {
    text: string;
    tag: string;
    count: number;
    ids: string[];
  }): string | undefined {
    console.log('criteria : ', this.criteria);
    return searchValue && searchValue.tag && searchValue.text
      ? searchValue.tag.slice(0, searchValue.text.length)
      : undefined;
    // return group && group.tag ? group.tag : undefined;
  }

  ngOnInit() {
    const initSearch = this.route.queryParamMap
      .pipe(
        tap(params => {
          const searchType = params.get('searchType');
          const searchTag = params.get('searchTag');
          if (typeof searchType === 'string' && typeof searchTag === 'string') {
            this.initialized = false;
            this.search.Text((searchTag.slice(0, 4) + '    ').slice(0, 4));
            const initSelect = this.search
              .AutoCompleteLocations()
              .pipe(
                take(2),
                tap(locations => {
                  console.log(searchTag, searchType);
                  if (locations) {
                    this.searchControl.setValue({
                      ...locations.filter(
                        l =>
                          l.type === searchType &&
                          l.tag.indexOf(searchTag) === 0
                      )[0],
                      text: searchTag
                    });
                    this.autoComplete({
                      ...locations.filter(
                        l =>
                          l.type === searchType &&
                          l.tag.indexOf(searchTag) === 0
                      )[0],
                      text: searchTag
                    });
                    this.initialized = true;
                  }
                })
              )
              .subscribe();
          } else {
            this.searchControl.setValue('');
            this.autoComplete('');
            this.initialized = true;
          }
        })
      )
      .subscribe();
    const watchCriteria = this.search
      .Criteria()
      .pipe(
        tap(criteria => {
          this.criteria = criteria;
        })
      )
      .subscribe();
    const watchVenues = this.search
      .Selection()
      .pipe(
        tap(selected => {
          this.selectedLocation = selected;
          console.log(selected);
        })
      )
      .subscribe();
    const watchAutoCompleteLocations = this.search
      .AutoCompleteLocations()
      .pipe(
        tap(locations => {
          this.autoCompleteLocations = locations;
        })
      )
      .subscribe();
    const watchAutoCompleteVenues = this.search
      .AutoCompleteVenues()
      .pipe(
        tap(venues => {
          this.autoCompleteVenues = venues;
        })
      )
      .subscribe();
  }
  autoComplete(starting) {
    const autocomp = this.searchControl.valueChanges
      .pipe(
        startWith(starting),
        tap(criteria => {
          if (typeof criteria === 'string') {
            this.search.Text(criteria);
          } else {
            this.search.Select(criteria);
          }
        })
      )
      .subscribe();
  }
  reset() {
    this.searchControl.setValue('');
    this.search.Text('');
    // this.router.navigate([], {});
  }
  getStars(rating: number): string[] {
    let stars = ['star', 'star', 'star', 'star', 'star'].slice(
      0,
      Math.floor(rating)
    );
    if (rating % 1 < 0.5) {
      stars = [...stars, 'star_border'];
    } else if (rating % 1 >= 0.5) {
      stars = [...stars, 'star_half'];
    }
    stars = [
      ...stars,
      'star_border',
      'star_border',
      'star_border',
      'star_border',
      'star_border'
    ].slice(0, 5);
    return stars;
  }

  getLocationValue(group, criteria) {
    return {
      ...group,
      text: criteria && criteria.searchText ? criteria.searchText : ''
    };
  }
  getVenueValue(group, criteria) {
    return {
      ...group,
      text: criteria && criteria.searchText ? criteria.searchText : ''
    };
  }
}
