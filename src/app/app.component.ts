import { Component } from '@angular/core';
import { CurrentNavLinkService } from '../services/current-nav-link.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  constructor(private navCurrent: CurrentNavLinkService) {}

  setCurrentNavLink(current: string): void {
    this.navCurrent.setCurrent(current);
  }

  getCurrentNavLink(): string {
    return this.navCurrent.getCurrent();
  }

}
