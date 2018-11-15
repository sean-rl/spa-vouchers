import { UserAccount } from '../../_shared/models/user-account.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'account-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class AccountDetailComponent implements OnInit {
  @Input()
  userAccount: UserAccount;
  @Output()
  updated = new EventEmitter<UserAccount>();

  constructor() {}

  ngOnInit() {}
}
