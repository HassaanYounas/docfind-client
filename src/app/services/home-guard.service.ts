import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HomeGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/user/dashboard']);
      return false;
    }
    return true;
  }
}
