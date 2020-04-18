import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { InputValidationService } from 'src/app/services/input-validation.service';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.sass']
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
    private userAuth: UserAuthService
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
      this.userAuth.authenticate(this.user)
        .subscribe(
          (res: any) => {
            this.validEmailPassword = true;
            console.log(res);
          },
          (err: any) => {
            this.authError = err;
            this.validEmailPassword = false;
          }
        );
    }
  }
}   
