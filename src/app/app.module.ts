import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { PatientComponent } from './patient';
import { DoctorComponent } from './doctor';
import { PatientSignupComponent } from './patient/patient-signup';

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
