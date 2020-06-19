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

  updatePatientCredentials() {

  }

  updatePatient() {

  }

  getPatient(id: string) {
    const url = API.getPatientByID;
    const body = { 'id': id };
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}` 
    });
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

  updateDoctorCredentials(params: any, doctorId: string) {
    const url = API.updateDoctorCredentials;
    const body = {
      id: doctorId,
      email: params.email,
      password: params.password,
      newEmail: params.newEmail,
      newPassword: params.newPassword
    }
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post(url, body, { headers }).pipe(catchError(this.errorHandler));
  }
  
  updateDoctor(params: any, doctorId: string) {
    const url = API.updateDoctor;
    const body = {
      id: doctorId,
      fullName: params.fullName,
      cellularNumber: params.cellularNumber,
      qualification: params.qualification,
      workingDays: params.workingDays,
      workingHours: params.workingHours,
      address: params.address,
      description: params.description,
      fee: params.fee
    }
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post(url, body, { headers }).pipe(catchError(this.errorHandler));
  }

  getDoctor(id: string) {
    const url = API.getDoctorByID;
    const body = { 'id': id }
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post(url, body, { headers }).pipe(catchError(this.errorHandler));
  }

  addRating() {

  }

  getAllDoctors() {
    const url = API.getAllDoctors;
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post(url, {}, { headers }).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: HttpErrorResponse) {
    return throwError(error.error.message);
  }
}
