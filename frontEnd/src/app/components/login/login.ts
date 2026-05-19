import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth-service';
import {SocketService} from '../../services/socket-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  formData = {
    email: '',
    mdp: ''
  };

  loading = false;
  message = '';

  constructor(
    private authService: AuthService, private socketService: SocketService,
    private router: Router
  ) {}

  login() {

    this.loading = true;

    this.authService.login(this.formData).subscribe({

      next: (res: any) => {


        console.log("LOGIN RESPONSE:", res);

        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user)); // 🔥 IMPORTANT

        const user = res.user;

        console.log("🔥 SOCKET USER ID:", user.id);

        this.socketService.connect(user.id); // 🔥 IMPORTANT
        this.message = 'Login success';
        this.loading = false;

        // attendre un peu
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 300);
      },

      error: (err) => {

        console.log(err);

        this.loading = false;

        this.message =
          err.error?.message || 'Login failed';
      }
    });
  }
}
