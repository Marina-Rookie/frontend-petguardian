import { Routes } from '@angular/router';
import { MascotasComponent } from './pages/mascotas/mascotas.component';
import { CuidadoresComponent } from './pages/cuidadores/cuidadores.component';
import { ReservaComponent } from './pages/reserva/reserva.component';
import { NuevaMascotaComponent } from './pages/nueva-mascota/nueva-mascota.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: 'mascotas', component: MascotasComponent},
  { path: 'cuidadores', component: CuidadoresComponent},
  { path: 'cuidadores/reserva', component: ReservaComponent},
  { path: 'mascotas/nueva', component: NuevaMascotaComponent},
  { path: 'login', component: LoginComponent}
];
