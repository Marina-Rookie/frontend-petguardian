import { Component, OnInit } from '@angular/core';
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
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { LocalStorageService } from '../../services/localstorage.service';

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
    NzUploadComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss',
})
export class PerfilComponent implements OnInit {
  isVisible = false;
  formPerfil: FormGroup = new FormGroup({});
  idUsuario: string = '';

  constructor(private fb: FormBuilder, private service: ApiService, private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.initForm();
    this.buscarDatosPerfil();
  }

  buscarDatosPerfil() {
    this.idUsuario = this.localStorageService.getIdUsuario();
    console.log(this.idUsuario);
    this.service.get('usuarios/' + this.idUsuario).subscribe({
      next: (data) => {
        console.log(data);
        this.setDatosFormPerfil(data);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  setDatosFormPerfil(data: any) {
    this.formPerfil.setValue({
      nombre: data.nombre,
      apellido: data.apellido,
      telefono: data.telefono ?? '',
      email: data.email,
      domicilio: data.domicilio ?? '',
      nombreContactoEmergencia: data.nombreContactoEmergencia ?? '',
      contactoEmergencia: data.contactoEmergencia ?? ''
    });
  }

  initForm() {
    this.formPerfil = this.fb.group({
      nombre: [''],
      apellido: [''],
      telefono: [''],
      email: [''],
      domicilio: [''],
      nombreContactoEmergencia: [''],
      contactoEmergencia: [''],
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  guardarDatosPerfil() {
    console.log(this.formPerfil.value);
  }

  getMascotasPorUsuario() {
    // Llamada a servicio
  }
}
