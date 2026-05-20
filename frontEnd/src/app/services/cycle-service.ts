// services/cycle.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CycleService {

  private cycleUrl = 'http://localhost:3000/api/cycle';

  private medicationUrl = 'http://localhost:3000/api/medication';

  private appointmentUrl = 'http://localhost:3000/api/appointments';

  constructor(private http: HttpClient) {}

  // ================= CYCLE =================

  createCycle(data: any): Observable<any> {
    return this.http.post(`${this.cycleUrl}/add`, data);
  }

  getAllCycles(): Observable<any> {
    return this.http.get(`${this.cycleUrl}/getAll`);
  }


  getCycleById(id: number): Observable<any> {
    return this.http.get(`${this.cycleUrl}/${id}`);
  }

  updateCycle(id: number, data: any): Observable<any> {
    return this.http.put(`${this.cycleUrl}/update/${id}`, data);
  }

  deleteCycle(id: number): Observable<any> {
    return this.http.delete(`${this.cycleUrl}/delete/${id}`);
  }

  // ================= MEDICATION =================

  createMedication(data: any): Observable<any> {
    return this.http.post(`${this.medicationUrl}/add`, data);
  }

  getAllMedications(): Observable<any> {
    return this.http.get(`${this.medicationUrl}/getAll`);
  }

  updateMedication(id: number, data: any): Observable<any> {
    return this.http.put(`${this.medicationUrl}/update/${id}`, data);
  }

  deleteMedication(id: number): Observable<any> {
    return this.http.delete(`${this.medicationUrl}/delete/${id}`);
  }

  // ================= APPOINTMENT =================

  createAppointment(data: any): Observable<any> {
    return this.http.post(this.appointmentUrl, data);
  }

  getAllAppointments(): Observable<any> {
    return this.http.get(this.appointmentUrl);
  }

  updateAppointment(id: number, data: any): Observable<any> {
    return this.http.put(`${this.appointmentUrl}/${id}`, data);
  }

  deleteAppointment(id: number): Observable<any> {
    return this.http.delete(`${this.appointmentUrl}/${id}`);
  }
}
