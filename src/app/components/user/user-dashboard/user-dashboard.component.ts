import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.sass']
})
export class UserDashboardComponent {

  constructor(private router: Router) { }

  logOut(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/user']);
  }
}
