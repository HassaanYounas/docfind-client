import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Patient } from '../../../models/patient.model';

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

  private patient: Patient;

  constructor(
    private countryCodes: DialCodesService,
    private formBuilder: FormBuilder,
    private inputValidation: InputValidationService,
    private http: HttpClient,
    private router: Router
  ) {
    this.patient = new Patient();
    this.patientSignUpForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      cellularNumber: '',
      dateOfBirth: ''
    });
  }

  ngOnInit(): void {
    this.dialCodes = this.countryCodes.getDialCodes();
    this.countryCode = 'Code';
  }

  setCountryCode(code: string): void {
    this.countryCode = '+' + code;
  }

  onSubmit(patientData: any): void {
    if (this.inputValidation.isString(patientData.firstName)) {
      if (patientData.lastName === '' || this.inputValidation.isString(patientData.lastName)) {
        if (this.inputValidation.isEmail(patientData.email)) {
          if (patientData.password.length >= 8) {
            if (patientData.password === patientData.confirmPassword) {
              if (this.countryCode !== 'Code') {
                this.patient.setValues(patientData, this.countryCode);
                this.register();
                if (localStorage.getItem('token')) {
                  this.router.navigate(['patient/dashboard']);
                }
              }
            }
          }
        } 
      } 
    } 
  }

  register(): void {
    const patientJson = JSON.stringify(this.patient);
    const url = 'http://localhost:3000/patient/register';
    const body = patientJson;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(url, body, { headers })
      .subscribe(
        res => {
          if (Object.keys(res).length === 0) this.authenticate();
        },
        err => {
          console.log(err);
        }
      );
  }

  authenticate(): void {
    const url = 'http://localhost:3000/patient/authenticate';
    const body = {
      email: this.patient.email,
      password: this.patient.password
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(url, body, { headers })
      .subscribe(
        res => {
          if ('token' in res) {
            //localStorage.setItem('token', res.token);
          }
        }
      );
  }

}
