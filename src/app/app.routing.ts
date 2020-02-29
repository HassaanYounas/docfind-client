import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { PatientComponent } from './patient';
import { DoctorComponent } from './doctor';
import { PatientSignupComponent } from './patient/patient-signup';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'patient', component: PatientComponent },
    { path: 'doctor', component: DoctorComponent },
    { path: 'patient/signup', component: PatientSignupComponent },
    { path: '**', redirectTo: '' }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
