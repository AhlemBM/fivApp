import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: Socket;
  private readonly SERVER_URL = 'http://localhost:3000';

  constructor() {
    this.socket = io(this.SERVER_URL, { autoConnect: false });
  }

  connect(userId: number): void {
    if (this.socket.connected) {
      console.log('⚠️ Socket déjà connecté');
      return;
    }
    this.socket.connect();
    this.socket.emit('join', userId);
    console.log(`🔌 Socket connecté pour user ${userId}`);
  }

  disconnect(): void {
    this.socket.disconnect();
  }

  onNotification(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('notification', (data) => {
        console.log('🔔 Notif reçue:', data);
        observer.next(data);
      });
      return () => this.socket.off('notification');
    });
  }
}
