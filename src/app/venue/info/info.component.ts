import { Component, Input, OnInit } from '@angular/core';
import { VenueInfo } from '../../_shared/models/venue-content.model';

@Component({
  selector: 'venue-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class VenueInfoComponent implements OnInit {
  @Input()
  info: VenueInfo;
  constructor() {}

  ngOnInit() {}
}
