import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.sass']
})
export class DoctorDashboardComponent implements OnInit {

  constructor(private router: Router) { 
    if (localStorage.getItem('type') === 'Patient') this.router.navigate(['/user/patient']);
  }

  ngOnInit(): void {}
}
