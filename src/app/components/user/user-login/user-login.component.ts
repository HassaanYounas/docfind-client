import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { InputValidationService } from 'src/app/services/input-validation.service';
import { APIService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html'
})
export class UserLoginComponent {

  validEmail: boolean = true;
  validAccountType: boolean = true;
  noError: boolean = true;

  loginForm: any;
  accountType: string;
  apiError: string;

  constructor(
    private formBuilder: FormBuilder,
    private inputValidation: InputValidationService,
    private api: APIService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({ email: '', password: '' }); 
    this.accountType = 'Account Type';
  }

  setAccountType(type: string): void {
    this.accountType = type;
  }

  onSubmit(formData: any): void {
    if (this.isValidInput(formData)) {
      if (this.accountType === 'Patient') {
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
      } else if (this.accountType === 'Doctor') {
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
    }
  }

  private isValidInput(formData: any): boolean {
    this.validEmail = !this.inputValidation.isEmail(formData.email) ? false : true;
    this.validAccountType = !(this.accountType !== 'Account Type') ? false : true;
    return (this.validEmail && this.validAccountType) ? true : false;
  }
}
