import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home';
import { PatientComponent } from './components/patient';
import { DoctorComponent } from './components/doctor';
import { PatientSignupComponent } from './components/patient/patient-signup';

import { AppRoutingModule } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PatientComponent,
    DoctorComponent,
    PatientSignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
