import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { DialCodesService } from '../../../services/dial-codes.service';
import { InputValidationService } from 'src/app/services/input-validation.service';

@Component({
  selector: 'app-patient-signup',
  templateUrl: './patient-signup.component.html',
  styleUrls: ['./patient-signup.component.sass']
})
export class PatientSignupComponent implements OnInit {

  patientSignUpForm: any;
  dialCodes: any;
  countryCode: string;

  constructor(
    private countryCodes: DialCodesService,
    private formBuilder: FormBuilder,
    private inputValidation: InputValidationService
  ) { 
    this.patientSignUpForm = this.formBuilder.group({
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

  onSubmit(patientData) {
    if (this.inputValidation.isString(patientData.firstName)) {
      if (patientData.lastName === '' || this.inputValidation.isString(patientData.lastName)) {
        if (this.inputValidation.isEmail(patientData.email)) {
          if (patientData.password.length >= 8) {
            if (patientData.password === patientData.confirmPassword) {
              console.log('valid');
            }
          }
        } 
      } 
    } 
  }

}
