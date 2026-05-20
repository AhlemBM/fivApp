import { Routes } from '@angular/router';
import {Acceuil} from './components/acceuil/acceuil';
import {Register} from './components/register/register';

import {Profile} from './components/profile/profile';
import {Login} from './components/login/login';
import {Notifications} from './components/notifications/notifications';
import {Comments} from './components/comments/comments';
import {Journal} from './components/journal/journal';
import {Support} from './components/support/support';

export const routes: Routes = [
  { path: '', component: Acceuil }  ,
 { path: 'register', component: Register } ,
  { path: 'profile', component: Profile } ,
  { path: 'login', component: Login },
  { path: 'comment', component: Comments },
  { path: 'journal', component: Journal },
  { path: 'support', component: Support },
  {path: 'notifications',component:Notifications}
];
