import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {

  formData = {
    firstName: '',
    email: '',
    mdp: ''
  };

  loading = false;
  message = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register() {

    if ( !this.formData.firstName ||  !this.formData.email || !this.formData.mdp) {
      this.message = 'Please fill all fields';
      return;
    }

    this.loading = true;

    this.authService.register(this.formData).subscribe({

      next: (res: any) => {

        this.loading = false;

        this.message = 'Register success';

        console.log(res);

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },

      error: (err) => {

        this.loading = false;

        this.message = err.error?.message || 'Register failed';
      }
    });
  }
}
