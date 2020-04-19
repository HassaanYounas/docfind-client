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
  doctors: User[];

  private user: User;
  
  constructor(
    private router: Router,
    private api: APIService
  ) {
    this.doctors = new Array<User>();
    this.api.getUser()
      .subscribe(
        (res: any) => {
          if (Object.keys(res).length !== 0) {
            this.initializeUI(res);
          }
        }
      );
    this.api.getDoctors()
      .subscribe(
        (res: any) => {
          if (Object.keys(res).length !== 0) {
            res.forEach(doc => {
              let doctor = new User();
              doctor.setDoctorForPatient(doc);
              this.doctors.push(doctor);
            });
          }
        }
      );
  }

  initializeUI(res: any) {
    this.user = new User();
    this.user.assignUser(res);
    this.userName = 'Hi! ' + this.user.fullName;

   
  }

  logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('_id');
    this.router.navigate(['/user']);
  }
}
