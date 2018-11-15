import { Component, OnInit, Input } from '@angular/core';
import { VenueContentService } from '../../services/venue-content.service';

@Component({
  selector: 'voucher-tile',
  templateUrl: './voucher-tile.component.html',
  styleUrls: ['./voucher-tile.component.scss']
})
export class VoucherTileComponent implements OnInit {
  @Input()
  voucher;

  constructor() {
  }

  ngOnInit() {
  }
}
