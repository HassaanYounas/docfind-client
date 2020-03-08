import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home';

import { PatientComponent } from './components/patient';
import { PatientSignupComponent } from './components/patient/patient-signup';
import { PatientLoginComponent } from './components/patient/patient-login';

import { DoctorComponent } from './components/doctor';
import { DoctorSignupComponent } from './components/doctor/doctor-signup';
import { DoctorLoginComponent } from './components/doctor/doctor-login';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'patient', component: PatientComponent },
    { path: 'patient/signup', component: PatientSignupComponent },
    { path: 'patient/login', component: PatientLoginComponent },
    { path: 'doctor', component: DoctorComponent },
    { path: 'doctor/signup', component: DoctorSignupComponent },
    { path: 'doctor/login', component: DoctorLoginComponent },
    { path: '**', redirectTo: '' }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
