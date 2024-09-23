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
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { LocalStorageService } from '../../services/localstorage.service';
import { ModalService } from '../../services/shared/modals.service';

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
    ReactiveFormsModule,
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss',
})
export class PerfilComponent implements OnInit {
  isVisible = false;
  formPerfil: FormGroup = new FormGroup({});
  idUsuario: string = '';
  mascotas: any = [];

  constructor(
    private fb: FormBuilder,
    private service: ApiService,
    private localStorageService: LocalStorageService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.idUsuario = this.localStorageService.getIdUsuario();
    this.initForm();
    this.buscarDatosPerfil();
    this.getMascotasPorUsuario();
  }

  buscarDatosPerfil() {
    this.service.get('usuarios/' + this.idUsuario).subscribe({
      next: (data) => {
        console.log(data);
        this.setDatosFormPerfil(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  setDatosFormPerfil(data: any) {
    this.formPerfil.setValue({
      nombre: data.nombre,
      apellido: data.apellido,
      telefono: data.telefono ?? '',
      email: data.email,
      domicilio: data.domicilio ?? '',
      nombreContactoEmergencia: data.nombreContactoEmergencia ?? '',
      contactoEmergencia: data.contactoEmergencia ?? '',
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

  actualizarDatosPerfil() {
    this.service
      .put(this.formPerfil.value, 'usuarios/update/' + this.idUsuario)
      .subscribe({
        next: (data) => {
          //this.setDatosFormPerfil(data);
          console.log(data);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  guardarMascota(mascota: any): void {
    console.log(mascota);
  }

  showModal(): void {
    console.log('showModal');
    this.modalService.showModal();
  }

  guardarDatosPerfil() {
    this.actualizarDatosPerfil();
    console.log(this.formPerfil.value);
  }

  getMascotasPorUsuario() {
    this.service.get('mascotas/mascotasPorUsuario/' + this.idUsuario).subscribe({
      next: (data) => {
        console.log(data);
        this.mascotas = data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
