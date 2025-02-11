import { Routes } from '@angular/router';
import { AprobarCuidadoresComponent } from './pages/aprobar-cuidadores/aprobar-cuidadores.component';
import { CuidadoresComponent } from './pages/cuidadores/cuidadores.component';
import { GestionHorariosComponent } from './pages/gestion-horarios/gestion-horarios.component';
import { LoginComponent } from './pages/login/login.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ReservaComponent } from './pages/reserva/reserva.component';
import { ReservasCuidadorComponent } from './pages/reservas-cuidador/reservas-cuidador.component';
import { AuthGuardService } from './services/auth/auth.guard';
import { RolGuard } from './services/auth/roles-auth.guard';
import { InformesComponent } from './pages/informes/informes.component';

export const routes: Routes = [
  {
    path: 'cuidadores',
    component: CuidadoresComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'aprobar-cuidadores',
    component: AprobarCuidadoresComponent,
    canActivate: [AuthGuardService, RolGuard],
    data: { expectedRoles: ['Administrador'] },
  },
  {
    path: 'reservas',
    component: ReservaComponent,
    canActivate: [AuthGuardService, RolGuard],
    data: { expectedRoles: ['Cliente'] },
  },
  {
    path: 'reservas-cuidador',
    component: ReservasCuidadorComponent,
    canActivate: [AuthGuardService, RolGuard],
    data: { expectedRoles: ['Cuidador Habilitado'] },
  },
  {
    path: 'horarios',
    component: GestionHorariosComponent,
    canActivate: [AuthGuardService, RolGuard],
    data: { expectedRoles: ['Cuidador Habilitado'] },
  },
  {
    path: 'perfil/:id',
    component: PerfilComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'informes',
    component: InformesComponent,
    canActivate: [AuthGuardService, RolGuard],
    data: { expectedRoles: ['Administrador'] },
  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];
