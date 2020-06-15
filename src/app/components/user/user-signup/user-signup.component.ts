import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { InputValidationService } from '../../../services/input-validation.service'; 
import { APIService } from '../../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.sass']
})
export class UserSignupComponent {

  validFullName: boolean = true;
  validEmail: boolean = true;
  validPassword: boolean = true;
  validPasswordConfirm: boolean = true;
  validAccountType: boolean = true;

  signUpForm: any;
  countryCode: string;
  accountType: string;

  constructor(
    private formBuilder: FormBuilder,
    private inputValidation: InputValidationService,
    private api: APIService,
    private router: Router
  ) {
    this.signUpForm = this.formBuilder.group({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    this.accountType = 'Account Type';
  }

  setAccountType(type: string): void {
    this.accountType = type;
  }

  onSubmit(userData: any): void {
    this.validFullName = !this.inputValidation.isString(userData.fullName) ? false : true;
    this.validEmail = !this.inputValidation.isEmail(userData.email) ? false : true;
    this.validPassword = !(userData.password.length >= 8) ? false : true;
    this.validPasswordConfirm = !(userData.password === userData.confirmPassword) ? false : true;
    this.validAccountType = !(this.accountType !== 'Account Type') ? false : true;
    if (this.validFullName && this.validEmail && this.validPassword && this.validPasswordConfirm && this.validAccountType) {
      if (this.accountType === 'Patient') {
        this.api.patientRegister(userData).subscribe(
          (res: any) => {
            console.log(res);
            if (Object.keys(res).length === 0) {
              this.api.patientAuthenticate(userData).subscribe(
                (res: any) => {
                  if (res.token !== '') {
                    localStorage.setItem('token', res.patient.token);
                    localStorage.setItem('_id', res.patient._id);
                    this.router.navigate(['/']);
                  }
                }
              );
            }
          }
        );
      } else {
        
      }
    }
  }
}
