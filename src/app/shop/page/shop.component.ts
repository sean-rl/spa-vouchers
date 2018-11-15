import { ShopService } from '../../_shared/services/shop.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Voucher } from '../../_shared/models/shop.model';

@Component({
  selector: 'shop-page',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopPageComponent implements OnInit {
  orderItems$: Observable<Voucher[]>;
  orderId$: Observable<string>;
  orderPaid$: Observable<boolean>;
  orderAmount$: Observable<number>;

  constructor(private shopService: ShopService) {
    this.orderItems$ = this.shopService.orderItems();
    this.orderId$ = this.shopService.orderId();
    this.orderPaid$ = this.shopService.orderPaid();
    this.orderAmount$ = this.shopService.orderAmount();
  }

  ngOnInit() {}
}
