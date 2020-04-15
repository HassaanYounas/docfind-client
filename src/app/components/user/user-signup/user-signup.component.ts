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

  validFirstName: boolean = true;
  validLastName: boolean = true;
  validEmail: boolean = true;
  validPassword: boolean = true;
  validPasswordConfirm: boolean = true;
  validDOB: boolean = true;
  validCellular: boolean = true;

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
    this.validFirstName = !this.inputValidation.isString(userData.firstName) ? false : true;
    this.validLastName = !this.inputValidation.isString(userData.lastName) ? false : true;
    this.validEmail = !this.inputValidation.isEmail(userData.email) ? false : true;
    this.validPassword = !(userData.password.length >= 8) ? false : true;
    this.validPasswordConfirm = !(userData.password === userData.confirmPassword) ? false : true;
    this.validDOB = userData.dateOfBirth === '' ? false : true;
    this.validCellular = !(this.countryCode !== 'Code' && this.inputValidation.isPhoneNumber(userData.cellularNumber)) ? false : true;

    if (this.validFirstName && this.validLastName && this.validEmail && this.validPassword && this.validPasswordConfirm && this.validDOB && this.validCellular) {
      this.user.setValues(userData, this.countryCode);
      this.userAuth.register(this.user);
    }
  }
}
