import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home';
import { PatientComponent } from './components/patient';
import { DoctorComponent } from './components/doctor';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'patient', component: PatientComponent },
    { path: 'doctor', component: DoctorComponent },
    { path: '**', redirectTo: '' }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
