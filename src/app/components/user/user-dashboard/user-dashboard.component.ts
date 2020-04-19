import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.sass']
})
export class UserDashboardComponent implements OnInit {

  private user: User;

  constructor(
    private router: Router,
    private api: APIService
  ) {
    this.user = new User();
    this.api.getUser()
        .subscribe(
          (res: any) => {
            if (Object.keys(res).length !== 0) {
              this.user.assignUser(res);
            }
          }
        );
  }

  ngOnInit() {
    
  }

  logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('_id');
    this.router.navigate(['/user']);
  }
}
