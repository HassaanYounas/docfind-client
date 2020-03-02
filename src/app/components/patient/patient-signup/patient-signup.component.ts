import { Component, OnInit } from '@angular/core';
import { DialCodesService } from '../../../services/dial-codes.service';

@Component({
  selector: 'app-patient-signup',
  templateUrl: './patient-signup.component.html',
  styleUrls: ['./patient-signup.component.sass']
})
export class PatientSignupComponent implements OnInit {

  dialCodes: any;

  constructor(private countryCodes: DialCodesService) { }

  ngOnInit(): void {
    this.dialCodes = this.countryCodes.getDialCodes();
  }

}
