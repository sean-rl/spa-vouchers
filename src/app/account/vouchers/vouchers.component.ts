import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'account-vouchers',
  templateUrl: './vouchers.component.html',
  styleUrls: ['./vouchers.component.scss']
})
export class AccountVouchersComponent implements OnInit {
  @Input()
  vouchers;
  constructor() {}

  ngOnInit() {}
}
