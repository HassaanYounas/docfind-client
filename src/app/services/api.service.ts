import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user.model';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as API from '../../assets/api.json';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient) {}

  patientRegister(patient: User) {
    const patientJson = JSON.stringify(patient);
    const url = API.patientRegister;
    const body = patientJson;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, body, { headers }).pipe(catchError(this.errorHandler));
  }

  patientAuthenticate(patient: User) {
    const url = API.authenticatePatient;
    const body = {
      email: patient.email,
      password: patient.password
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, body, { headers }).pipe(catchError(this.errorHandler));
  }

  doctorRegister(doctor: User) {
    const doctorJson = JSON.stringify(doctor);
    const url = API.doctorRegister;
    const body = doctorJson;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, body, { headers }).pipe(catchError(this.errorHandler));
  }

  updatePatient() {

  }

  getPatient() {
    const url = API.getPatientByID;
    const body = {
      '_id': localStorage.getItem('_id')
    }
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}` 
    });
    return this.http.post(url, body, { headers }).pipe(catchError(this.errorHandler));
  }

  // getDoctors() {
  //   const url = API.doctorsGet;
  //   const headers = new HttpHeaders({ 
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${localStorage.getItem('token')}` 
  //   });
  //   return this.http.get(url, { headers }).pipe(catchError(this.errorHandler));
  // }

  private errorHandler(error: HttpErrorResponse) {
    return throwError(error.error.message);
  }
}
