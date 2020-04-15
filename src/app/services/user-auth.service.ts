import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private user: User;

  constructor(
    private http: HttpClient,
  ) {
    this.user = new User();
  }

  register(user: User): void {
    this.user = user
    const userJson = JSON.stringify(this.user);
    const url = 'http://localhost:3000/user/register';
    const body = userJson;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(url, body, { headers })
      .subscribe(
        res => {
          if (Object.keys(res).length === 0) this.authenticate();
        },
        err => {
          console.log(err);
        }
      );
  }

  authenticate(): void {
    const url = 'http://localhost:3000/user/authenticate';
    const body = {
      email: this.user.email,
      password: this.user.password
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(url, body, { headers })
      .subscribe(
        (res: any) => {
          if ('token' in res) {
            localStorage.setItem('token', res.token);
          }
        }
      );
  }
}
