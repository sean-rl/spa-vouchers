import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
import { Component } from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate,
  query
} from '@angular/animations';
import { UserService } from './_shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'spa-voucher-web';
  navLinks = [
    {
      path: '/shop',
      label: 'Buy Voucher',
      xslabel: 'Shop'
    },
    {
      path: '/search',
      label: 'Search Spa\'s',
      xslabel: 'Search'
    },
    {
      path: '/news',
      label: 'Latest News',
      xslabel: 'News'
    },
    {
      path: '/account',
      label: 'My Account',
      xsicon: 'account_circle'
    }
  ];
  activeLink = null;
  acctime;
  screenSize;
  constructor(private breakpointObserver: BreakpointObserver, private userService: UserService) {
    const watchSizes = [
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ];
    breakpointObserver.observe(watchSizes).subscribe(result => {
      if (result.breakpoints[Breakpoints.XSmall]) {
        this.screenSize = 'xs';
      }
      if (result.breakpoints[Breakpoints.Small]) {
        this.screenSize = 'sm';
      }
      if (result.breakpoints[Breakpoints.Medium]) {
        this.screenSize = 'md';
      }
      if (result.breakpoints[Breakpoints.Large]) {
        this.screenSize = 'lg';
      }
      if (result.breakpoints[Breakpoints.XLarge]) {
        this.screenSize = 'xl';
      }
    });
  }
}
