import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shop-vouchers',
  templateUrl: './vouchers.component.html',
  styleUrls: ['./vouchers.component.scss']
})
export class ShopVouchersComponent implements OnInit {
  @Input()
  orderItems;
  constructor() {}

  ngOnInit() {}
}
