// services/cycle-message.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CycleMessageService {

  private apiUrl = 'http://localhost:3000/api/cycle-message';

  constructor(private http: HttpClient) {}

  getMessageByDay(day: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${day}`);
  }

}
