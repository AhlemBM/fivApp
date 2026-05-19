import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-welcome',
  imports: [CommonModule],
  templateUrl: './welcome.html',
  styleUrl: './welcome.scss',
})
export class Welcome {
  startJourney() {
    // مثال: scroll أو routing لاحقًا
    document.getElementById('profile')?.scrollIntoView({ behavior: 'smooth' });
  }

}
