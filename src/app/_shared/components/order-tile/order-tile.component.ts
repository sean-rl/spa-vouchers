import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'order-tile',
  templateUrl: './order-tile.component.html',
  styleUrls: ['./order-tile.component.scss']
})
export class OrderTileComponent implements OnInit {
  @Input()
  order;
  constructor() { }

  ngOnInit() {
  }

}
