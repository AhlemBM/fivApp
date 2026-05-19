import { Component } from '@angular/core';
import {Education} from '../education/education';
import {Footer} from '../footer/footer';

import {Welcome} from '../welcome/welcome';
import {Navbar} from '../navbar/navbar';
import {Journey} from '../journey/journey';

@Component({
  selector: 'app-acceuil',

  imports: [
    Navbar,
    Welcome,
    Journey,
    Education,

    Footer],
  templateUrl: './acceuil.html',
  styleUrl: './acceuil.scss',
})
export class Acceuil {}
