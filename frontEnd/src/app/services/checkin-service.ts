// checkin.service.ts

import { Injectable } from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckinService {

  // =========================
  // APIs
  // =========================

  private moodApi =
    'http://localhost:3000/api/mood';

  private emotionalApi =
    'http://localhost:3000/api/emotional';

  constructor(
    private http: HttpClient
  ) {}

  // =========================
  // MOOD CHECKIN
  // =========================

  create(data: any): Observable<any> {

    return this.http.post(
      this.moodApi,
      data
    );
  }

  getByUser(userId: number): Observable<any> {

    return this.http.get(
      `${this.moodApi}/user/${userId}`
    );
  }

  getToday(userId: number): Observable<any> {

    return this.http.get(
      `${this.moodApi}/today/${userId}`
    );
  }

  // =========================
  // EMOTIONAL CONTENT
  // =========================

  getContentByType(type: string): Observable<any> {

    return this.http.get(
      `${this.emotionalApi}/type/${type}`
    );
  }
}
