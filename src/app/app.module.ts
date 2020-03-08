import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home';
import { PatientComponent } from './components/patient';
import { DoctorComponent } from './components/doctor';
import { PatientSignupComponent } from './components/patient/patient-signup';

import { AppRoutingModule } from './app.routing';
import { PatientLoginComponent } from './components/patient/patient-login/patient-login.component';
import { PatientDashboardComponent } from './components/patient/patient-dashboard/patient-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PatientComponent,
    DoctorComponent,
    PatientSignupComponent,
    PatientLoginComponent,
    PatientDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
