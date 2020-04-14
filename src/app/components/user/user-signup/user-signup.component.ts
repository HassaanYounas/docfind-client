import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../../../models/user.model';

import { DialCodesService } from '../../../services/dial-codes.service';
import { InputValidationService } from 'src/app/services/input-validation.service';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.sass']
})
export class UserSignupComponent implements OnInit {

  signUpForm: any;
  dialCodes: any;
  countryCode: string;

  private user: User;

  constructor(
    private countryCodes: DialCodesService,
    private formBuilder: FormBuilder,
    private inputValidation: InputValidationService,
    private http: HttpClient,
    private router: Router
  ) {
    this.user = new User();
    this.signUpForm = this.formBuilder.group({
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

  onSubmit(userData: any): void {
    if (this.inputValidation.isString(userData.firstName)) {
      if (userData.lastName === '' || this.inputValidation.isString(userData.lastName)) {
        if (this.inputValidation.isEmail(userData.email)) {
          if (userData.password.length >= 8) {
            if (userData.password === userData.confirmPassword) {
              if (this.countryCode !== 'Code') {
                this.user.setValues(userData, this.countryCode);
                this.register();
                if (localStorage.getItem('token')) {
                  this.router.navigate(['user/dashboard']);
                }
              }
            }
          }
        } 
      } 
    } 
  }

  register(): void {
    const userJson = JSON.stringify(this.user);
    const url = 'http://localhost:3000/user/register';
    const body = userJson;
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
    const url = 'http://localhost:3000/user/authenticate';
    const body = {
      email: this.user.email,
      password: this.user.password
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
