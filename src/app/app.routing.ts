import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { UserSignupComponent } from './components/user/user-signup/user-signup.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { AuthGuardService } from './services/auth-guard.service';
import { HomeGuardService } from './services/home-guard.service';
import { DoctorDashboardComponent } from './components/user/doctor-dashboard/doctor-dashboard.component';
import { PatientDashboardComponent } from './components/user/patient-dashboard/patient-dashboard.component';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [HomeGuardService] },
    { path: 'user', component: UserComponent, canActivate: [HomeGuardService] },
    { path: 'user/signup', component: UserSignupComponent, canActivate: [HomeGuardService] },
    { path: 'user/login', component: UserLoginComponent, canActivate: [HomeGuardService] },
    { path: 'user/doctor', component: DoctorDashboardComponent, canActivate: [AuthGuardService] },
    { path: 'user/patient', component: PatientDashboardComponent, canActivate: [AuthGuardService] },
    { path: '**', redirectTo: '/' }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
