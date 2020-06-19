import { Component, Input, AfterViewInit } from '@angular/core';
import { Patient } from 'src/app/models/patient.model';
import { Doctor } from 'src/app/models/doctor.model';

@Component({
  selector: 'app-patient-dashboard-doctors-list',
  templateUrl: './patient-dashboard-doctors-list.component.html',
  styleUrls: ['./patient-dashboard-doctors-list.component.sass']
})
export class PatientDashboardDoctorsListComponent implements AfterViewInit {

  expanded: boolean[];

  @Input() patient: Patient;
  @Input() doctors: Doctor[];

  constructor() {}

  flipIcon(i: number) {
    if (this.expanded[i] === true) {
      document.getElementById('expandIcon' + i).style.transform = 'scale(1)';
      this.expanded[i] = false;
    } else {
      document.getElementById('expandIcon' + i).style.transform = 'scale(-1)';
      this.expanded[i] = true;
    }
  }

  ngAfterViewInit() {
    this.expanded = new Array<boolean>(this.doctors.length);
    console.log(this.doctors);
  }
}
