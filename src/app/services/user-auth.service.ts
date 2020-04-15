import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  register(user: User): void {
    const userJson = JSON.stringify(user);
    const url = 'http://localhost:3000/user/register';
    const body = userJson;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(url, body, { headers })
      .subscribe(
        res => {
          if (Object.keys(res).length === 0) this.authenticate(user);
        },
        err => {
          console.log(err);
        }
      );
  }

  authenticate(user: User): void {
    const url = 'http://localhost:3000/user/authenticate';
    const body = {
      email: user.email,
      password: user.password
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(url, body, { headers })
      .subscribe(
        (res: any) => {
          if ('token' in res) {
            localStorage.setItem('token', res.token);
            this.router.navigate(['/']);
          }
        }
      );
  }
}
