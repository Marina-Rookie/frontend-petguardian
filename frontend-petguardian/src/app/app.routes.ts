import { Routes } from '@angular/router';
import { CuidadoresComponent } from './pages/cuidadores/cuidadores.component';
import { ReservaComponent } from './pages/reserva/reserva.component';
import { NuevaMascotaComponent } from './pages/nueva-mascota/nueva-mascota.component';
import { LoginComponent } from './pages/login/login.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

export const routes: Routes = [
  { path: 'cuidadores', component: CuidadoresComponent},
  { path: 'cuidadores/reserva', component: ReservaComponent},
  { path: 'mascotas/nueva', component: NuevaMascotaComponent},
  { path: 'perfil', component: PerfilComponent},
  { path: 'login', component: LoginComponent}
];
