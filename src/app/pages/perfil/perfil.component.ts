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
import { LocalStorageService } from '../../services/localstorage.service';
import { ModalService } from '../../services/shared/modals.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgZorroModule } from '../../ngzorro.module';
import { MascotaService } from '../../services/mascota.service';
import { CuidadorService } from '../../services/cuidador.service';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    NgZorroModule,
    CardMascotaComponent,
    NuevaMascotaComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss',
})
export class PerfilComponent implements OnInit {
  isVisible = false;
  formPerfilCliente: FormGroup = new FormGroup({});
  formPerfilCuidador: FormGroup = new FormGroup({});
  idUsuario: string = '';
  isCliente: boolean = false;
  isCuidadorPendiente: boolean = false;
  mascotas: any = [];

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private modalService: ModalService,
    private msg: NzMessageService,
    private mascotaService: MascotaService,
    private cuidadorService: CuidadorService,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.idUsuario = this.localStorageService.getIdUsuario();
    this.isCliente = this.localStorageService.getIsCliente();
    this.isCuidadorPendiente =
      this.localStorageService.getIsCuidadorPendiente();
    this.initForm();
    this.buscarDatosPerfil();
    if (this.isCliente) {
      this.getMascotasPorUsuario();
    }
  }

  buscarDatosPerfil() {
    if (this.isCliente) {
      this.clienteService.getById(this.idUsuario).subscribe({
        next: (data) => {
          console.log(data);
          this.setDatosformPerfilCliente(data);
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      this.cuidadorService.getById(this.idUsuario).subscribe({
        next: (data) => {
          console.log(data);
          this.setDatosformPerfilCuidador(data);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  setDatosformPerfilCliente(data: any) {
    this.formPerfilCliente.setValue({
      nombre: data.nombre,
      apellido: data.apellido,
      telefono: data.telefono ?? '',
      email: data.email,
      domicilio: data.domicilio ?? '',
      nombreContactoEmergencia: data.nombreContactoEmergencia ?? '',
      contactoEmergencia: data.contactoEmergencia ?? '',
    });
  }

  setDatosformPerfilCuidador(data: any) {
    this.formPerfilCuidador.setValue({
      nombre: data.nombre,
      apellido: data.apellido,
      telefono: data.telefono ?? '',
      email: data.email,
      domicilio: data.domicilio ?? '',
      descripcionPersonal: data.descripcionPersonal ?? '',
      tarifaHora: data.tarifaHora ?? '',
    });
  }

  initForm() {
    if (this.isCliente) {
      this.initFormPerfilCliente();
    } else {
      this.initFormPerfilCuidador();
    }
  }

  initFormPerfilCliente() {
    this.formPerfilCliente = this.fb.group({
      nombre: [''],
      apellido: [''],
      telefono: [''],
      email: [''],
      domicilio: [''],
      nombreContactoEmergencia: [''],
      contactoEmergencia: [''],
    });
  }

  initFormPerfilCuidador() {
    this.formPerfilCuidador = this.fb.group({
      nombre: [''],
      apellido: [''],
      telefono: [''],
      email: [''],
      domicilio: [''],
      descripcionPersonal: [''],
      tarifaHora: [''],
    });
  }

  actualizarDatosPerfil() {
    if (this.isCliente) {
      this.clienteService.put(this.formPerfilCliente.value, this.idUsuario).subscribe({
        next: (data) => {
          console.log(data);
          this.msg.success('Datos actualizados con éxito');
        },
        error: (error) => {
          console.log(error);
          this.msg.error('Error al actualizar los datos');
        },
      });
    } else {
      this.cuidadorService.put(this.formPerfilCuidador.value, this.idUsuario).subscribe({
        next: (data) => {
          console.log(data);
          this.msg.success('Datos actualizados con éxito');
        },
        error: (error) => {
          console.log(error);
          this.msg.error('Error al actualizar los datos');
        },
      });
    }
  }

  guardarMascota(mascota: any): void {
    console.log(mascota);
  }

  showModal(): void {
    console.log('showModal');
    this.modalService.setMascotaEditModal(null);
    this.modalService.showModal();
  }

  getMascotasPorUsuario() {
    this.mascotaService.getMascotasPorCliente(this.idUsuario).subscribe({
      next: (data) => {
        console.log(data);
        this.mascotas = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  recargarMascotas() {
    console.log('recargarMascotas');
    this.getMascotasPorUsuario();
  }
}
