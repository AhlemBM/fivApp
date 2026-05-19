import {
  Component,
  Inject,
  PLATFORM_ID,
  OnInit
} from '@angular/core';

import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class Navbar implements OnInit {

  isLoggedIn = false;
  unreadCount = 0;

  active = 'welcome';

  menuOpen = false;

  constructor(

    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {

    this.checkLogin();


  }

  checkLogin(): void {

    if (isPlatformBrowser(this.platformId)) {

      const token = localStorage.getItem('token');

      this.isLoggedIn = !!token;
    }
  }

  setActive(section: string) {
    this.active = section;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  logout(): void {

    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }

    this.isLoggedIn = false;
    this.menuOpen = false;

    window.location.href = '/login';
  }


}
