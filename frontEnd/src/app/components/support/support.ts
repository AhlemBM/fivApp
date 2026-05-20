import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [CommonModule, Navbar, Footer],
  templateUrl: './support.html',
  styleUrls: ['./support.scss']
})
export class Support {}
