import { Component, Input } from '@angular/core';
import { Patient } from 'src/app/models/patient.model';
import { Doctor } from 'src/app/models/doctor.model';

@Component({
  selector: 'app-patient-dashboard-doctors-list',
  templateUrl: './patient-dashboard-doctors-list.component.html',
  styleUrls: ['./patient-dashboard-doctors-list.component.sass']
})
export class PatientDashboardDoctorsListComponent {

  @Input() patient: Patient;
  @Input() doctors: Doctor[];

  constructor() {}
}
