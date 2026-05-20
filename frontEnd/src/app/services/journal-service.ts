import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JournalService {

  private apiUrl = 'http://localhost:3000/api/journal';

  constructor(private http: HttpClient) {}

  getToday(): Observable<any> {
    return this.http.get(`${this.apiUrl}/today`);
  }

  save(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getHistory(): Observable<any> {
    return this.http.get(`${this.apiUrl}/history`);
  }
}
