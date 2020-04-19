import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { User } from '../../../models/user.model';
import { DialCodesService } from '../../../services/dial-codes.service';
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
  validDOB: boolean = true;
  validCellular: boolean = true;
  validAccountType: boolean = true;

  signUpForm: any;
  dialCodes: any;
  countryCode: string;
  accountType: string;

  private user: User;

  constructor(
    private countryCodes: DialCodesService,
    private formBuilder: FormBuilder,
    private inputValidation: InputValidationService,
    private api: APIService,
    private router: Router
  ) {
    this.user = new User();
    this.signUpForm = this.formBuilder.group({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      cellularNumber: '',
      dateOfBirth: ''
    });
    this.dialCodes = this.countryCodes.getDialCodes();
    this.countryCode = 'Code';
    this.accountType = 'Account Type';
  }

  setCountryCode(code: string): void {
    this.countryCode = '+' + code;
  }

  setAccountType(type: string): void {
    this.accountType = type;
  }

  onSubmit(userData: any): void {
    this.validFullName = !this.inputValidation.isString(userData.fullName) ? false : true;
    this.validEmail = !this.inputValidation.isEmail(userData.email) ? false : true;
    this.validPassword = !(userData.password.length >= 8) ? false : true;
    this.validPasswordConfirm = !(userData.password === userData.confirmPassword) ? false : true;
    this.validDOB = userData.dateOfBirth === '' ? false : true;
    this.validCellular = !(this.countryCode !== 'Code' && this.inputValidation.isPhoneNumber(userData.cellularNumber)) ? false : true;
    this.validAccountType = !(this.accountType !== 'Account Type') ? false : true;

    if (this.validFullName && this.validEmail && this.validPassword && this.validPasswordConfirm && this.validDOB && this.validCellular && this.validAccountType) {
      if (this.accountType === 'Patient') {
        this.user.setValues(userData, this.countryCode, 1);
      } else {
        this.user.setValues(userData, this.countryCode, 2);
      }
      this.api.register(this.user)
        .subscribe(
          (res: any) => {
            if (Object.keys(res).length === 0) {
              this.api.authenticate(userData)
                .subscribe(
                  (res: any) => {
                    if (res.token !== '') {
                      localStorage.setItem('token', res.token);
                      this.router.navigate(['/']);
                    }
                  }
                );
            }
          }
        );
    }
  }
}
