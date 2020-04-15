import { Component } from '@angular/core';
import { Router, NavigationEnd  } from '@angular/router';

import { filter } from 'rxjs/operators';  

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  private loggedIn: boolean;
  private current: string;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.current = event.url;
      });
    if (localStorage.getItem('token')) {
      this.loggedIn = true;
      this.router.navigate(['/user/dashboard']);
    } else {
      this.loggedIn = false;
    }
  }

  setActive(regexStr: string): string {
    const regex = new RegExp(regexStr);
    return regex.test(this.current) ? 'active' : '';
  }

  isLoggedIn(): string {
    return this.loggedIn ? 'd-none' : '';
  }

  showLogOut(): string {
    return !this.loggedIn ? 'd-none': '';
  }
}
