import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { PatientComponent } from './patient';
import { DoctorComponent } from './doctor';

import { AppRoutingModule } from './app.routing';

import { CurrentNavLinkService } from '../services/current-nav-link.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PatientComponent,
    DoctorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    CurrentNavLinkService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
