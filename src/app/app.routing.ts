import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { PatientComponent } from './patient';
import { DoctorComponent } from './doctor';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'patient', component: PatientComponent },
    { path: 'doctor', component: DoctorComponent },
    { path: '**', redirectTo: '' }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
