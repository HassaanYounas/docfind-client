import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { UserSignupComponent } from './components/user/user-signup/user-signup.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { AppRoutingModule } from './app.routing';
import { DoctorDashboardComponent } from './components/user/doctor-dashboard/doctor-dashboard.component';
import { PatientDashboardComponent } from './components/user/patient-dashboard/patient-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    UserSignupComponent,
    UserLoginComponent,
    DoctorDashboardComponent,
    PatientDashboardComponent,
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
export class AppModule {}
