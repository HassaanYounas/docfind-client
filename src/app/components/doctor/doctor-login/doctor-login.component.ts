import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-doctor-login',
  templateUrl: './doctor-login.component.html',
  styleUrls: ['./doctor-login.component.sass']
})
export class DoctorLoginComponent implements OnInit {

  doctorLoginForm: any;

  constructor(private formBuilder: FormBuilder) { 
    this.doctorLoginForm = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  ngOnInit(): void {
  }

  onSubmit(doctorData) {
  }

}
