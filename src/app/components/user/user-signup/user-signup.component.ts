import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { InputValidationService } from '../../../services/input-validation.service'; 
import { APIService } from '../../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html'
})
export class UserSignupComponent {

  validFullName: boolean = true;
  validEmail: boolean = true;
  validPassword: boolean = true;
  validPasswordConfirm: boolean = true;
  validAccountType: boolean = true;
  noError: boolean = true;

  signUpForm: any;
  accountType: string;
  apiError: string;

  constructor(
    private formBuilder: FormBuilder,
    private inputValidation: InputValidationService,
    private api: APIService,
    private router: Router
  ) {
    this.signUpForm = this.formBuilder.group({
      fullName: '', email: '', password: '', confirmPassword: ''
    }); 
    this.accountType = 'Account Type';
  }

  setAccountType(type: string): void {
    this.accountType = type;
  }

  onSubmit(formData: any): void {
    if (this.isValidInput(formData)) {
      if (this.accountType === 'Patient') {
        this.api.patientRegister(formData).subscribe(
          (res: any) => {
            this.noError = true;
            if (Object.keys(res).length === 0) {
              this.api.patientAuthenticate(formData).subscribe(
                (res: any) => {
                  this.noError = true;
                  if (res.token !== '') {
                    localStorage.setItem('token', res.token);
                    localStorage.setItem('id', res._id);
                    localStorage.setItem('type', 'Patient');
                    this.router.navigate(['/']);
                  }
                }, (error: any) => { this.noError = false; this.apiError = error; }
              );
            }
          }, (error: any) => { this.noError = false; this.apiError = error; }
        );
      } else if (this.accountType === 'Doctor') {
        this.api.doctorRegister(formData).subscribe(
          (res: any) => {
            this.noError = true;
            if (Object.keys(res).length === 0) {
              this.api.doctorAuthenticate(formData).subscribe(
                (res: any) => {
                  this.noError = true;
                  if (res.token !== '') {
                    localStorage.setItem('token', res.token);
                    localStorage.setItem('id', res._id);
                    localStorage.setItem('type', 'Doctor');
                    this.router.navigate(['/']);
                  }
                }, (error: any) => { this.noError = false; this.apiError = error; }
              );
            }
          }, (error: any) => { this.noError = false; this.apiError = error; }
        );
      }
    }
  }

  private isValidInput(formData: any): boolean {
    this.validFullName = !this.inputValidation.isAlphabetsOnly(formData.fullName) ? false : true;
    this.validEmail = !this.inputValidation.isEmail(formData.email) ? false : true;
    this.validPassword = !(formData.password.length >= 8) ? false : true;
    this.validPasswordConfirm = !(formData.password === formData.confirmPassword) ? false : true;
    this.validAccountType = !(this.accountType !== 'Account Type') ? false : true;
    return (this.validFullName && this.validEmail && this.validPassword && this.validPasswordConfirm && this.validAccountType) ? true : false;
  }
}
