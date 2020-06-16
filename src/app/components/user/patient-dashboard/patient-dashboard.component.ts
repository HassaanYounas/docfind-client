import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.sass']
})
export class PatientDashboardComponent implements OnInit {

  constructor(private router: Router) {
    if (localStorage.getItem('type') === 'Doctor') this.router.navigate(['/user/doctor']);
  }

  ngOnInit(): void {}
}
