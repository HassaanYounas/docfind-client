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
import { AboutComponent } from './components/about/about.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { PatientDashboardDoctorsListComponent } from './components/user/patient-dashboard/patient-dashboard-doctors-list/patient-dashboard-doctors-list.component';
import { PatientDashboardSettingsComponent } from './components/user/patient-dashboard/patient-dashboard-settings/patient-dashboard-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    UserSignupComponent,
    UserLoginComponent,
    DoctorDashboardComponent,
    PatientDashboardComponent,
    AboutComponent,
    PrivacyPolicyComponent,
    PatientDashboardDoctorsListComponent,
    PatientDashboardSettingsComponent,
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
