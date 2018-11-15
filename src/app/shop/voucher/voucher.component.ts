import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { addDays } from '../../_shared/services/booking-days.service';
import { ShopService } from '../../_shared/services/shop.service';

const today = new Date();

@Component({
  selector: 'shop-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss']
})
export class ShopVoucherComponent implements OnInit {
  voucherType = 'electronic';
  // email = 'jef.richards@spa-vouchers.co.uk';
  // name = 'Jef Richards';
  // message = 'This is a message';
  // amount = 5000;
  rdate = new Date();
  minDate = today;
  maxDate = addDays(today, 60);
  address = '';
  email = '';
  name = '';
  message = '';
  amount = 5000;
  amounts = [
    2000,
    3000,
    4000,
    5000,
    6000,
    7000,
    8000,
    9000,
    10000,
    12000,
    15000,
    20000,
    25000,
    30000,
    40000,
    50000
  ];
  constructor(
    private shopService: ShopService
  ) {}

  ngOnInit() {}
  restartVoucher() {
    this.voucherType = 'electronic';
    // email = 'jef.richards@spa-vouchers.co.uk';
    // name = 'Jef Richards';
    // message = 'This is a message';
    // amount = 5000;
    this.rdate = new Date();
    this.minDate = today;
    this.maxDate = addDays(today, 60);
    this.address = '';
    this.email = '';
    this.name = '';
    this.message = '';
    this.amount = 5000;  }
  addVoucher() {
    const mths = ['1', 'F', '3', 'A', 'M', 'J', '7', '8', 'S', 'O', 'N', 'D'];
    const mt = mths[today.getMonth()];
    const dy = today
      .getDate()
      .toString(36)
      .toUpperCase();
    const hr = today
      .getHours()
      .toString(36)
      .toUpperCase();
    const mn = today
      .getMinutes()
      .toString(36)
      .toUpperCase();
    const ms = Math.floor(today.getSeconds() * 1000 + today.getMilliseconds())
      .toString(36)
      .toUpperCase();
    this.shopService.orderAddItem({
      userUid: 'unassigned',
      recipientName: this.name,
      recipientEmail: this.email,
      recipientMessage: this.message,
      recipientDate: new Date(),
      recipientAddress: this.address,
      voucherAmount: this.amount,
      optionalAmount:
        this.voucherType === 'gift'
          ? 299
          : this.voucherType === 'box'
            ? 799
            : 0,
      // voucherCode: mt + dy + hr + mn + ms,
      voucherCode: new Date().valueOf()
        .toString(36)
        .toUpperCase(),
      voucherType: this.voucherType
    });
    this.restartVoucher();
  }
}
