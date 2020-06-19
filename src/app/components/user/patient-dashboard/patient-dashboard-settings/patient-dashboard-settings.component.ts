import { Component, Input } from '@angular/core';
import { Patient } from 'src/app/models/patient.model';

@Component({
  selector: 'app-patient-dashboard-settings',
  templateUrl: './patient-dashboard-settings.component.html',
  styleUrls: ['./patient-dashboard-settings.component.sass']
})
export class PatientDashboardSettingsComponent {

  @Input() patient: Patient

  constructor() {}
}
