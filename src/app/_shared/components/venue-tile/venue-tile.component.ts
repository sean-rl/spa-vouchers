import { Component, Input, OnInit } from '@angular/core';
import { VenueDoc } from '../../services/search.service';

@Component({
  selector: 'venue-tile',
  templateUrl: './venue-tile.component.html',
  styleUrls: ['./venue-tile.component.scss']
})
export class VenueTileComponent implements OnInit {
  @Input()
  venue: VenueDoc;
  constructor() { }

  ngOnInit() { }
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
