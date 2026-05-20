import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private apiUrl = 'http://localhost:3000/api/comments';

  constructor(private http: HttpClient) {}

  getComments(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createComment(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  deleteComment(id: number): Observable<any> {
    const token = localStorage.getItem('token'); // ou ton storage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}
