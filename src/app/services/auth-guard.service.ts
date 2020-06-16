import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('type') === 'Patient') return true;
    else if (localStorage.getItem('type') === 'Doctor') return true;
    this.router.navigate(['/']);
    return false;
  }
}
