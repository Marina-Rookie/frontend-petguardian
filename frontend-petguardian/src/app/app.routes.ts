import { Routes } from '@angular/router';
import { MascotasComponent } from './pages/mascotas/mascotas.component';
import { CuidadoresComponent } from './pages/cuidadores/cuidadores.component';

export const routes: Routes = [
  { path: 'mascotas', component: MascotasComponent},
  { path: 'cuidadores', component: CuidadoresComponent},

];
