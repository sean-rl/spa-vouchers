import { UserAccount } from '../../_shared/models/user-account.model';
import { UserService } from './../../_shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'account-page',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountPageComponent implements OnInit {
  userLoggedIn$: Observable<any>;
  userAccount$: Observable<UserAccount>;
  userVouchers$: Observable<any[]>;
  userBookings$: Observable<any[]>;
  userOrders$: Observable<any[]>;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userLoggedIn$ = this.userService.isAvailable();
    this.userAccount$ = this.userService.getUser();
    this.userBookings$ = this.userService.getBookings();
    this.userOrders$ = this.userService.getOrders();
    this.userVouchers$ = this.userService.getVouchers();
  }
  updateUserAccount(userAccount: UserAccount) {
    this.userService.updateUserAccount(userAccount);
  }

  logout() {
    this.userService.logout();
  }
}
