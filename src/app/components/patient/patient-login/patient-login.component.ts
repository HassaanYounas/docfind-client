import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-patient-login',
  templateUrl: './patient-login.component.html',
  styleUrls: ['./patient-login.component.sass']
})
export class PatientLoginComponent implements OnInit {

  patientLoginForm: any;

  constructor(private formBuilder: FormBuilder) {
    this.patientLoginForm = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  ngOnInit(): void {
  }

  onSubmit(patientData) {
    
  }

}
