import { Component } from '@angular/core';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { CardMascotaComponent } from '../../components/card-mascota/card-mascota.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NuevaMascotaComponent } from '../nueva-mascota/nueva-mascota.component';
import { CommonModule } from '@angular/common';
import { NzUploadComponent } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    NzImageModule,
    NzDividerModule,
    NzFormModule,
    CardMascotaComponent,
    NzInputModule,
    NzButtonModule,
    NzCardModule,
    NzIconModule,
    NzModalModule,
    NuevaMascotaComponent,
    CommonModule,
    NzUploadComponent
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss',
})
export class PerfilComponent {
  isVisible = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  
}