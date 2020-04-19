import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.sass']
})
export class UserDashboardComponent {

  userName: string;

  private user: User;
  
  constructor(
    private router: Router,
    private api: APIService
  ) {
    this.api.getUser()
        .subscribe(
          (res: any) => {
            if (Object.keys(res).length !== 0) {
              this.initializeUI(res);
            }
          }
        );
  }

  initializeUI(res: any) {
    this.user = new User();
    this.user.assignUser(res);
    this.userName = 'Hi! ' + this.user.fullName;

    this.api.getDoctors()
      .subscribe(
        (res: any) => {
          if (Object.keys(res).length !== 0) {
            console.log(res);
          }
        }
      );
  }

  logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('_id');
    this.router.navigate(['/user']);
  }
}
