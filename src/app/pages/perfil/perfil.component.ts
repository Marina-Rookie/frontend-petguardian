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
import { NzMessageService } from 'ng-zorro-antd/message';

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
  formPerfilCliente: FormGroup = new FormGroup({});
  formPerfilCuidador: FormGroup = new FormGroup({});
  idUsuario: string = '';
  isCliente: boolean = false;
  isCuidadorPendiente: boolean = false;
  mascotas: any = [];

  constructor(
    private fb: FormBuilder,
    private service: ApiService,
    private localStorageService: LocalStorageService,
    private modalService: ModalService,
    private msg: NzMessageService
  ) {}

  ngOnInit(): void {
    this.idUsuario = this.localStorageService.getIdUsuario();
    this.isCliente = this.localStorageService.getIsCliente();
    this.isCuidadorPendiente = this.localStorageService.getIsCuidadorPendiente();
    this.initForm();
    this.buscarDatosPerfil();
    if(this.isCliente){
      this.getMascotasPorUsuario();
    }
  }

  buscarDatosPerfil() {
    this.service.get('usuarios/' + this.idUsuario).subscribe({
      next: (data) => {
        console.log(data);
        if(this.isCliente){
          console.log('cliente', data);
          this.setDatosformPerfilCliente(data);
        } else {
          console.log('cuidador', data);
          this.setDatosformPerfilCuidador(data);
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
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
      tarifaHora: data.tarifaHora ?? ''
    });
  }

  initForm() {
    if(this.isCliente){
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
      tarifaHora: ['']
    });
  }

  actualizarDatosPerfil() {
    this.service
      .put(this.formPerfilCliente.value, 'usuarios/update/' + this.idUsuario)
      .subscribe({
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

  guardarMascota(mascota: any): void {
    console.log(mascota);
  }

  showModal(): void {
    console.log('showModal');
    this.modalService.setMascotaEditModal(null);
    this.modalService.showModal();
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

  recargarMascotas(){
    console.log('recargarMascotas');
    this.getMascotasPorUsuario();
  }
}
