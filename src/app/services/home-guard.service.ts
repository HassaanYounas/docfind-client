import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HomeGuardService implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('type') === 'Patient') {
      this.router.navigate(['/user/patient']);
      return false;
    } else if (localStorage.getItem('type') === 'Doctor') {
      this.router.navigate(['/user/doctor']);
      return false;
    } return true;
  }
}
