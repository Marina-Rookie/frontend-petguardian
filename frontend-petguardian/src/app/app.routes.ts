import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MascotasComponent } from './pages/mascotas/mascotas.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'mascotas', component: MascotasComponent},
];
