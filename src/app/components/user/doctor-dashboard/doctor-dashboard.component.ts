import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialCodesService } from 'src/app/services/dial-codes.service';
import { InputValidationService } from 'src/app/services/input-validation.service';
import { Doctor } from 'src/app/models/doctor.model';
import { APIService } from 'src/app/services/api.service';
import { Title } from '@angular/platform-browser';

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
  validNewEmail: boolean = true;
  validNewPassword: boolean = true;
  validNewPasswordConfirm: boolean = true;

  successMessageRight: boolean = false;
  successMessageLeft: boolean = false;
  noErrorRight: boolean = true;
  noErrorLeft: boolean = true;

  doctorName: string = '';
  countryCode: string = '';
  apiErrorRight: string = '';
  apiErrorLeft: string = '';

  informationForm: any;
  credentialsForm: any;
  dialCodes: any;

  doctor: Doctor;

  constructor(
    private titleService: Title,
    private router: Router,
    private formBuilder: FormBuilder,
    private dialCodeService: DialCodesService,
    private inputValidation: InputValidationService,
    private api: APIService
  ) {
    if (localStorage.getItem('type') === 'Patient') this.router.navigate(['/user/patient']);
    else {
      this.doctor = new Doctor();
      this.api.getDoctor(localStorage.getItem('id')).subscribe(
        (res: any) => {
          if (res.token !== '') {
            this.informationForm = this.formBuilder.group({
              fullName: '', qualification: '', address: '', workingDays: '', 
              workingHours: '', description: '', fee: '', cellularNumber: ''
            });
            this.credentialsForm = this.formBuilder.group({
              email: '', password: '', newEmail: '', newPassword: '', newConfirmPassword: ''
            });
            this.setupDashboard(res);
          }
        }
      );
    }
  }

  setCountryCode(code: string) {
    this.countryCode = code;
  }

  setupDashboard(res: any): void {
    this.doctor.setValues(
      res._id,
      res.fullName,
      res.email,
      '',
      res.cellularNumber,
      res.qualification,
      res.workingDays,
      res.workingHours,
      res.address,
      res.fee,
      res.description,
      res.ratings
    );
    this.doctorName = this.doctor.fullName + ' | Doctor';
    this.setInformationFormValues();
    this.setCredentialsFormValues();
    this.dialCodes = this.dialCodeService.getDialCodes();
    if (this.doctor.cellularNumber === '') this.countryCode = 'Code';
    else this.countryCode = this.doctor.cellularNumber.substring(0, 2);
    this.titleService.setTitle(this.doctor.fullName + ' | Doctor');
  }

  setInformationFormValues(): void {
    this.informationForm.controls['fullName'].setValue(this.doctor.fullName);
    this.informationForm.controls['qualification'].setValue(this.doctor.qualification);
    this.informationForm.controls['address'].setValue(this.doctor.address);
    this.informationForm.controls['workingDays'].setValue(this.doctor.workingDays);
    this.informationForm.controls['workingHours'].setValue(this.doctor.workingHours);
    this.informationForm.controls['description'].setValue(this.doctor.description);
    this.informationForm.controls['cellularNumber'].setValue(this.doctor.cellularNumber.substring(2));
    this.informationForm.controls['fee'].setValue(this.doctor.fee);
  }

  setCredentialsFormValues(): void {
    this.credentialsForm.controls['email'].setValue(this.doctor.email);
    this.credentialsForm.controls['password'].setValue('');
    this.credentialsForm.controls['newEmail'].setValue('');
    this.credentialsForm.controls['newPassword'].setValue('');
    this.credentialsForm.controls['newConfirmPassword'].setValue('');
  }

  logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('type');
    this.titleService.setTitle('DocFind');
    this.router.navigate(['/']);
  }

  onInfoSubmit(formData: any): void {
    if (this.isValidInput(formData)) {
      formData.cellularNumber = this.countryCode + formData.cellularNumber;
      this.api.updateDoctor(formData, localStorage.getItem('id')).subscribe(
        (res: any) => {
          this.noErrorRight = true;
          if (res.token !== '') {
            localStorage.setItem('token', res.token);
            this.setupDashboard(res);
            this.successMessageLeft = true;
          }
        }, (error: any) => { this.noErrorRight = false; this.apiErrorRight = error; }
      );
      setTimeout(() => this.successMessageLeft = false, 3000);
    }
  }

  onCredentialsSubmit(formData: any): void {
    this.validEmail = !this.inputValidation.isEmail(formData.email) ? false : true;
    this.validPassword = !(formData.password === '');
    this.validNewEmail = !this.inputValidation.isEmail(formData.newEmail) ? false : true;
    this.validNewPassword = (formData.newPassword.length >= 8);
    this.validNewPasswordConfirm = formData.newPassword === formData.newConfirmPassword;
    if (this.validEmail && this.validPassword && this.validNewEmail && this.validNewPassword && this.validNewPasswordConfirm) {
      this.api.updateDoctorCredentials(formData, localStorage.getItem('id')).subscribe(
        (res: any) => {
          this.noErrorRight = true;
          if (res.token !== '') {
            localStorage.setItem('token', res.token);
            this.setupDashboard(res);
            this.successMessageRight = true;
          }
        }, (error: any) => { this.noErrorRight = false; this.apiErrorRight = error; }
      );
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
    this.validCellular = !(this.inputValidation.isPhoneNumber(formData.cellularNumber) && this.countryCode !== 'Code') ? false : true;
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
