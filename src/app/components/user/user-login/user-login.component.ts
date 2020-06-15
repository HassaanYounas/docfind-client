import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { InputValidationService } from 'src/app/services/input-validation.service';
import { APIService } from 'src/app/services/api.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html'
})
export class UserLoginComponent {

  validEmail: boolean = true;
  validEmailPassword: boolean = true;
  authError: string;
  loginForm: any;
  
  private user: User;

  constructor(
    private formBuilder: FormBuilder,
    private inputValidation: InputValidationService,
    private api: APIService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: ''
    });
    this.user = new User();
  }

  onSubmit(userData: any): void {
    this.validEmail = !this.inputValidation.isEmail(userData.email) ? false : true;
    if (this.validEmail) {
      this.user.email = userData.email;
      this.user.password = userData.password;
    }
  }
}   
