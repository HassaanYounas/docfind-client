import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home';
import { PatientComponent } from './components/patient';
import { DoctorComponent } from './components/doctor';
import { PatientSignupComponent } from './components/patient/patient-signup';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'patient', component: PatientComponent },
    { path: 'doctor', component: DoctorComponent },
    { path: 'patient/signup', component: PatientSignupComponent },
    { path: '**', redirectTo: '' }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
