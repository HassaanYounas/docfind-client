import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user.model';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private http: HttpClient) {}

  register(user: User) {
    const userJson = JSON.stringify(user);
    const url = 'http://localhost:3000/user/register';
    const body = userJson;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, body, { headers });
  }

  authenticate(user: User) {
    const url = 'http://localhost:3000/user/authenticate';
    const body = {
      email: user.email,
      password: user.password
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, body, { headers }).pipe(
      catchError(this.errorHandler)
    );
  }

  private errorHandler(error: HttpErrorResponse) {
    return throwError(error.error.message);
  }
}
