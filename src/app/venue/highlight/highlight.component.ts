import { VenueHighlight } from '../../_shared/models/venue-content.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'venue-highlight',
  templateUrl: './highlight.component.html',
  styleUrls: ['./highlight.component.scss']
})
export class VenueHighlightComponent implements OnInit {
  @Input()
  highlight: VenueHighlight;
  constructor() {}

  ngOnInit() {}
}
