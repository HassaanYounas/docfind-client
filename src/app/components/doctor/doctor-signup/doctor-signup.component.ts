import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { DialCodesService } from '../../../services/dial-codes.service';

@Component({
  selector: 'app-doctor-signup',
  templateUrl: './doctor-signup.component.html',
  styleUrls: ['./doctor-signup.component.sass']
})
export class DoctorSignupComponent implements OnInit {

  doctorSignUpForm: any;
  dialCodes: any;
  countryCode: string;

  constructor(
    private countryCodes: DialCodesService,
    private formBuilder: FormBuilder
  ) { 
    this.doctorSignUpForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      date: '',
      contact: ''
    });
  }

  ngOnInit(): void {
    this.dialCodes = this.countryCodes.getDialCodes();
    this.countryCode = 'Code';
  }

  setCountryCode(code: string): void {
    this.countryCode = '+' + code;
  }

  onSubmit(doctorData) {
    
  }

}
