import { Routes } from '@angular/router';
import {Acceuil} from './components/acceuil/acceuil';
import {Register} from './components/register/register';

import {Profile} from './components/profile/profile';
import {Login} from './components/login/login';
import {Notifications} from './components/notifications/notifications';

export const routes: Routes = [
  { path: '', component: Acceuil }  ,
 { path: 'register', component: Register } ,
  { path: 'profile', component: Profile } ,
  { path: 'login', component: Login },
  {
    path: 'notifications',component:Notifications}
];
