import { Routes } from '@angular/router';
import { CuidadoresComponent } from './pages/cuidadores/cuidadores.component';
import { ReservaComponent } from './pages/reserva/reserva.component';
import { NuevaMascotaComponent } from './pages/nueva-mascota/nueva-mascota.component';
import { LoginComponent } from './pages/login/login.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { AuthGuardService } from './services/auth/auth.guard';
import { AprobarCuidadoresComponent } from './pages/aprobar-cuidadores/aprobar-cuidadores.component';

export const routes: Routes = [
  { path: 'cuidadores', component: CuidadoresComponent, canActivate: [AuthGuardService]},
  { path: 'aprobar-cuidadores', component: AprobarCuidadoresComponent, canActivate: [AuthGuardService]},
  { path: 'reservas', component: ReservaComponent, canActivate: [AuthGuardService]},
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuardService]},
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];
