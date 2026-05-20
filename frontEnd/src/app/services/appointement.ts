import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl = 'http://localhost:3000/api/appointment';

  constructor(private http: HttpClient) {}
  getMyCycle(): Observable<any> {
    return this.http.get("http://localhost:3000/api/cycles/current");
  }
  create(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


}
