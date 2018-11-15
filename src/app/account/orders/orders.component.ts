import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'account-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class AccountOrdersComponent implements OnInit {
  @Input()
  orders;
  constructor() {}

  ngOnInit() {}
}
