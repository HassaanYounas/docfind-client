import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home';

import { UserComponent } from './components/user';
import { UserSignupComponent } from './components/user/user-signup';
import { UserLoginComponent } from './components/user/user-login';
import { UserDashboardComponent } from './components/user/user-dashboard';

import { AuthGuardService } from './services/auth-guard.service';
import { HomeGuardService } from './services/home-guard.service';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [HomeGuardService] },
    { path: 'user', component: UserComponent, canActivate: [HomeGuardService] },
    { path: 'user/signup', component: UserSignupComponent, canActivate: [HomeGuardService] },
    { path: 'user/login', component: UserLoginComponent, canActivate: [HomeGuardService] },
    { path: 'user/dashboard', component: UserDashboardComponent, canActivate: [AuthGuardService] },
    { path: '**', redirectTo: '/' }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
