import { Component } from '@angular/core';
import { Router, NavigationEnd  } from '@angular/router';

import { filter } from 'rxjs/operators';  

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  private current: string;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.current = event.url;
      });
  }

  setHomeActive(): string {
    return this.current === '/' ? 'active' : '';
  }

  setPatientActive(): string {
    const regex = new RegExp('^/patient.*');
    return regex.test(this.current) ? 'active' : '';
  }

  setDoctorActive(): string {
    const regex = new RegExp('^/doctor.*');
    return regex.test(this.current) ? 'active' : '';
  }
}
