import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private readonly apiUrl = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object  // 👈
  ) {}

  private getHeaders(): HttpHeaders {
    const token = isPlatformBrowser(this.platformId)
      ? localStorage.getItem('token') || ''
      : '';
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  getMyNotifications(): Observable<any[]> {
    if (!isPlatformBrowser(this.platformId)) return of([]);

    const token = localStorage.getItem('token');
    if (!token) {
      console.log('⚠️ Pas de token, skip notifications');
      return of([]);
    }

    return this.http.get<any>(`${this.apiUrl}/notifications`, {
      headers: this.getHeaders()
    }).pipe(
      map(res => {
        console.log('📋 RAW response:', res);
        return Array.isArray(res) ? res : res.data || res.notifications || [];
      })
    );
  }

  markAsRead(notifId: number): Observable<any> {
    if (!isPlatformBrowser(this.platformId)) return of(null);
    return this.http.patch(
      `${this.apiUrl}/notifications/${notifId}/read`, {},
      { headers: this.getHeaders() }
    );
  }
}
