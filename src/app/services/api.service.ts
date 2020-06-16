import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Patient } from '../models/patient.model';
import { Doctor } from '../models/doctor.model';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as API from '../../assets/api.json';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient) {}

  patientRegister(patient: Patient) {
    const patientJSON = JSON.stringify(patient);
    const url = API.patientRegister;
    const body = patientJSON;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, body, { headers }).pipe(catchError(this.errorHandler));
  }

  patientAuthenticate(patient: Patient) {
    const url = API.authenticatePatient;
    const body = { email: patient.email, password: patient.password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, body, { headers }).pipe(catchError(this.errorHandler));
  }

  doctorRegister(doctor: Doctor) {
    const doctorJSON = JSON.stringify(doctor);
    const url = API.doctorRegister;
    const body = doctorJSON;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, body, { headers }).pipe(catchError(this.errorHandler));
  }

  doctorAuthenticate(doctor: Doctor) {
    const url = API.authenticateDoctor;
    const body = { email: doctor.email, password: doctor.password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, body, { headers }).pipe(catchError(this.errorHandler));
  }

  // getPatient() {
  //   const url = API.getPatientByID;
  //   const body = {
  //     '_id': localStorage.getItem('_id')
  //   }
  //   const headers = new HttpHeaders({ 
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${localStorage.getItem('token')}` 
  //   });
  //   return this.http.post(url, body, { headers }).pipe(catchError(this.errorHandler));
  // }

  private errorHandler(error: HttpErrorResponse) {
    return throwError(error.error.message);
  }
}
