import { Component } from '@angular/core';
import { CurrentNavLinkService } from 'src/services/current-nav-link.service';

@Component({
    templateUrl: 'home.component.html'
})
export class HomeComponent {

    constructor(private navCurrent: CurrentNavLinkService) {}

    navLinkChange(current: string): void {
        this.navCurrent.setCurrent(current);
    }

}
