import { Component } from '@angular/core';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { CardMascotaComponent } from '../../components/card-mascota/card-mascota.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    NzImageModule,
    NzDividerModule,
    NzFormModule,
    CardMascotaComponent,
    NzInputModule,
    NzButtonModule
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss',
})
export class PerfilComponent {}
