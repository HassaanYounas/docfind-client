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
    this.router.events.subscribe((event) => {
        if (!(event instanceof NavigationEnd)) return;
        window.scrollTo(0, 0)
    });
  }

  setActive(regexStr: string): string {
    const regex = new RegExp(regexStr);
    return regex.test(this.current) ? 'active' : '';
  }
}
