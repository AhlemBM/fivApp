import { Component, OnDestroy, afterNextRender, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe, isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { SocketService } from '../../services/socket-service';
import { NotificationService } from '../../services/notification-service';
import {Navbar} from '../navbar/navbar';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, DatePipe,Navbar],
  templateUrl: './notifications.html',
  styleUrls: ['./notifications.scss']
})
export class Notifications implements OnDestroy {

  notifications: any[] = [];
  private socketSub: Subscription | null = null;

  constructor(
    private socketService: SocketService,
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    afterNextRender(() => {
      this.loadNotifications();
      this.listenSocket();
    });
  }

  loadNotifications(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.notificationService.getMyNotifications().subscribe({
      next: (notifs) => {
        console.log('📋 Notifs:', notifs.length);
        this.notifications = Array.isArray(notifs) ? notifs : [];
        this.cdr.detectChanges();  // 👈 force la mise à jour de la vue
      },
      error: (err) => {
        if (err.status === 401) return;
        console.error('❌ Erreur:', err.status);
      }
    });
  }

  listenSocket(): void {
    this.socketSub = this.socketService.onNotification().subscribe({
      next: (notif) => {
        console.log('🔔 Nouvelle notif:', notif.title);
        this.notifications.unshift(notif);
        this.cdr.detectChanges();  // 👈 force la mise à jour
      }
    });
  }

  markAsRead(notif: any): void {
    if (notif.isRead) return;
    this.notificationService.markAsRead(notif.id).subscribe({
      next: () => {
        notif.isRead = true;
        this.cdr.detectChanges();
      }
    });
  }

  getIcon(type: string): string {
    switch (type) {
      case 'cycle': return '🌸';
      case 'appointment': return '📅';
      case 'medication': return '💊';
      default: return '🔔';
    }
  }

  get unreadCount(): number {
    return this.notifications.filter(n => !n.isRead).length;
  }

  ngOnDestroy(): void {
    this.socketSub?.unsubscribe();
  }
}
