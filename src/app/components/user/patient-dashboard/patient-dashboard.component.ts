import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.sass']
})
export class PatientDashboardComponent {

  constructor(private router: Router) {
    if (localStorage.getItem('type') === 'Doctor') this.router.navigate(['/user/doctor']);
  }
}
