import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from 'src/app/models/patient.model';
import { APIService } from 'src/app/services/api.service';
import { Title } from '@angular/platform-browser';
import { Doctor } from 'src/app/models/doctor.model';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.sass']
})
export class PatientDashboardComponent {

  patient: Patient;
  doctors: Doctor[];

  showDoctorsList: boolean = true;
  showSettings: boolean = false;
  patientName: string;

  constructor(
    private api: APIService,
    private router: Router,
    private titleService: Title
  ) {
    if (localStorage.getItem('type') === 'Doctor') this.router.navigate(['/user/doctor']);
    this.patient = new Patient();
    this.doctors = new Array<Doctor>();
    this.api.getPatient(localStorage.getItem('id')).subscribe(
      (res: any) => {
        if (res.token !== '') {
          this.api.getAllDoctors().subscribe(
            (res: any) => {
              if (res.token !== '') this.setDoctors(res);
            }
          );
          this.setupDashboard(res);
        }
      }
    );
  }

  setDoctors(res: any) {
    res.forEach(e => {
      let doctor = new Doctor();
      doctor.setValues(
        e.fullName, e.email, '', e.cellularNumber,
        e.qualification, e.workingDays, e.workingHours, 
        e.address, e.fee, e.description, e.ratings
      );
      this.doctors.push(doctor);
    });
    this.doctors.sort((a, b) => {
      if (a.avgRating > b.avgRating) return -1;
      if (a.avgRating < b.avgRating) return 1;
      return 0;
    });
  }

  gotoDoctorsList(): void {
    this.showDoctorsList = true;
    this.showSettings = false;
  }

  gotoSettings(): void {
    this.showDoctorsList = false;
    this.showSettings = true;
  }

  logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('type');
    this.titleService.setTitle('DocFind');
    this.router.navigate(['/']);
  }

  setupDashboard(res: any): void {
    this.patient.setValues(res.fullName, res.email, '');
    this.patientName = this.patient.fullName + ' | Patient';
  }
}
