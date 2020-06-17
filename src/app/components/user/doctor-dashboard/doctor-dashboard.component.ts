import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialCodesService } from 'src/app/services/dial-codes.service';
import { InputValidationService } from 'src/app/services/input-validation.service';
import { Doctor } from 'src/app/models/doctor.model';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.sass']
})
export class DoctorDashboardComponent {

  validFullName: boolean = true;
  validQualification: boolean = true;
  validAddress: boolean = true;
  validWorkingDays: boolean = true;
  validWorkingHours: boolean = true;
  validDescription: boolean = true;
  validCellular: boolean = true;
  validFee: boolean = true;

  validEmail: boolean = true;
  validPassword: boolean = true;
  validPasswordConfirm: boolean = true;

  successMessageRight: boolean = false;
  successMessageLeft: boolean = false;
  noErrorRight: boolean = true;
  noErrorLeft: boolean = true;

  countryCode: string = '';
  apiErrorRight: string = '';
  apiErrorLeft: string = '';

  informationForm: FormGroup;
  credentialsForm: FormGroup;
  dialCodes: any;

  doctor: Doctor;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private dialCodeService: DialCodesService,
    private inputValidation: InputValidationService
  ) {
    if (localStorage.getItem('type') === 'Patient') this.router.navigate(['/user/patient']);
    this.informationForm = this.formBuilder.group({
      fullName: '', qualification: '', address: '', workingDays: '', 
      workingHours: '', description: '', fee: '', cellularNumber: ''
    });
    this.credentialsForm = this.formBuilder.group({
      email: '', password: '', confirmPassword: ''
    }); 
    this.dialCodes = this.dialCodeService.getDialCodes();
    this.countryCode = '+92';
    this.doctor = new Doctor();
  }

  setCountryCode(code: string) {
    this.countryCode = '+' + code;
  }

  onInfoSubmit(formData: any): void {
    //this.informationForm.controls['fullName'].setValue('Name');
    if (this.isValidInput(formData)) {
      this.successMessageLeft = true;
      setTimeout(() => this.successMessageLeft = false, 3000);
    }
  }

  onCredentialsSubmit(formData: any): void {
    this.validEmail = !this.inputValidation.isEmail(formData.email) ? false : true;
    this.validPassword = (formData.password.length >= 8);
    this.validPasswordConfirm = formData.password === formData.confirmPassword;
    if (this.validEmail && this.validPassword && this.validPasswordConfirm) {
      this.successMessageRight = true;
      setTimeout(() => this.successMessageRight = false, 3000);
    }
  }

  private isValidInput(formData: any): boolean {
    this.validFullName = !this.inputValidation.isAlphabetsOnly(formData.fullName) ? false : true;
    this.validQualification = (formData.qualification === '') ? false : true;
    this.validAddress = (formData.address === '') ? false : true;
    this.validWorkingDays = (formData.workingDays === '') ? false : true;
    this.validWorkingHours = (formData.workingHours === '') ? false : true;
    this.validDescription = (formData.description === '') ? false : true;
    this.validCellular = !this.inputValidation.isPhoneNumber(formData.cellularNumber) ? false : true;
    this.validFee = (formData.fee === '') ? false : true;
    return this.validFullName &&
      this.validQualification &&
      this.validAddress &&
      this.validWorkingDays &&
      this.validWorkingHours &&
      this.validDescription && 
      this.validCellular &&
      this.validFee ? true : false;
  }
}
