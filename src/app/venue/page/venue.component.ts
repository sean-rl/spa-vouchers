import { VenueContentDoc } from '../../_shared/models/venue-content.model';
import { Component, OnInit } from '@angular/core';
import { VenueContentService } from '../../_shared/services/venue-content.service';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { VenuePackageService } from '../../_shared/services/venue-package.service';

@Component({
  selector: 'venue-page',
  templateUrl: './venue.component.html',
  styleUrls: ['./venue.component.scss']
})
export class VenuePageComponent implements OnInit {
  venue$: Observable<any>;
  selectedPackage$: Observable<any>;
  selectedPackageId: string;
  constructor(
    private venue: VenueContentService,
    private venuePackage: VenuePackageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const v$ = this.route.paramMap.subscribe((params: ParamMap) => {
      this.venue$ = this.venue.Select(params.get('venueDash'));
      if (params.get('packageId')) {
        this.selectedPackageId = params.get('packageId');
        this.selectedPackage$ = this.venuePackage.Select(
          this.selectedPackageId
        );
      } else {
        this.selectedPackageId = null;
      }
    });
  }
  trackByPackage(index: number, pck: any): string {
    return pck && pck['id'] ? pck['id'] : null;
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
}
