import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { User } from '../../../models/user.model';
import { DialCodesService } from '../../../services/dial-codes.service';
import { InputValidationService } from '../../../services/input-validation.service'; 
import { UserAuthService } from '../../../services/user-auth.service';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.sass']
})
export class UserSignupComponent {

  signUpForm: any;
  dialCodes: any;
  countryCode: string;

  private user: User;

  constructor(
    private countryCodes: DialCodesService,
    private formBuilder: FormBuilder,
    private inputValidation: InputValidationService,
    private userAuth: UserAuthService
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
    this.dialCodes = this.countryCodes.getDialCodes();
    this.countryCode = 'Code';
  }

  setCountryCode(code: string): void {
    this.countryCode = '+' + code;
  }

  onSubmit(userData: any): void {
    if (this.inputValidation.isString(userData.firstName) && this.inputValidation.isString(userData.lastName)) {
      if (this.inputValidation.isEmail(userData.email)) {
        if (userData.password.length >= 8) {
          if (userData.password === userData.confirmPassword) {
            if (this.countryCode !== 'Code') {
              this.user.setValues(userData, this.countryCode);
              this.userAuth.register(this.user);
            }
          }
        }
      }
    }     
  }  
}
