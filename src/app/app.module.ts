import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home';
import { PatientComponent } from './components/patient';
import { DoctorComponent } from './components/doctor';
import { PatientSignupComponent } from './components/patient/patient-signup';

import { AppRoutingModule } from './app.routing';
import { PatientLoginComponent } from './components/patient/patient-login/patient-login.component';
import { PatientDashboardComponent } from './components/patient/patient-dashboard/patient-dashboard.component';

import { DoctorDashboardComponent } from './components/doctor/doctor-dashboard/doctor-dashboard.component';
import { DoctorSignupComponent } from './components/doctor/doctor-signup/doctor-signup.component';
import { DoctorLoginComponent } from './components/doctor/doctor-login/doctor-login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PatientComponent,
    DoctorComponent,
    PatientSignupComponent,
    PatientLoginComponent,
    PatientDashboardComponent,
    DoctorDashboardComponent,
    DoctorSignupComponent,
    DoctorLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
