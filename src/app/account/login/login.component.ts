import { UserService } from './../../_shared/services/user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'account-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class AccountLoginComponent {
  model = {
    email: '',
    password: ''
  };
  constructor(private userService: UserService) {}

  loginEmail() {
    this.userService.loginEmail(this.model.email, this.model.password);
  }
  loginFacebook() {
    this.userService.loginFacebook();
  }
  loginGoogle() {
    this.userService.loginGoogle();
  }
}
