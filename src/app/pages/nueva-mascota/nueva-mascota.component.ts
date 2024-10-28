import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { TipoMascota } from '../../models/TipoMascota';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EtapaVida } from '../../models/EtapaVida';
import { LocalStorageService } from '../../services/localstorage.service';
import { ModalService } from '../../services/shared/modals.service';
import { NgZorroModule } from '../../ngzorro.module';
import { MascotaService } from '../../services/mascota.service';
import { EtapasVidaService } from '../../services/etapasvida.service';
import { TiposMascotaService } from '../../services/tiposmascota.service';

@Component({
  selector: 'app-nueva-mascota',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroModule
  ],
  templateUrl: './nueva-mascota.component.html',
  styleUrl: './nueva-mascota.component.scss',
})
export class NuevaMascotaComponent implements OnInit {

  @Input() idMascota: number = 0;
  @Output() recargarMascotas: EventEmitter<any> = new EventEmitter<any>();
  loading = false;
  avatarUrl?: string;
  mascota: any;
  tiposMascota: TipoMascota[] = [];
  etapasVida: EtapaVida[] = [];
  formMascota: FormGroup = new FormGroup({});
  isVisible = false;
  fileList: NzUploadFile[] = [];
  formData: FormData = new FormData();

  constructor(
    private msg: NzMessageService,
    private mascotaService: MascotaService,
    private etapaVidaService: EtapasVidaService,
    private tipoMascotaService: TiposMascotaService,
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private modalService: ModalService
  ) {
  }

  ngOnInit(): void {
    this.formInit();
    this.modalService.isVisible$.subscribe((isVisible) => {
      this.isVisible = isVisible;
    });
    this.modalService.mascotaEditModal$.subscribe((mascota) => {
      this.mascota = mascota;
      if(mascota !== null) {
        this.formMascota.patchValue(mascota);
        this.formMascota.controls['tipoMascota'].setValue(mascota.tipoMascota._id);
        this.formMascota.controls['etapaVida'].setValue(mascota.etapaVida._id);
      } else {
        this.formMascota.reset();
      }
    });
    this.getTiposMascota();
    this.getEtapasVidaMascota();
  }

  formInit() {
    this.formMascota = this.fb.group({
      nombre: ['', Validators.required],
      tipoMascota: ['', Validators.required],
      etapaVida: ['', Validators.required],
      obsComida: [''],
      obsEnfermedades: [''],
      obsOtros: [''],
      urlImagen: [''],
    });
  }

  getEtapasVidaMascota() {
    this.etapaVidaService.getAll().subscribe({
      next: (data) => {
        this.etapasVida = data;
      },
      error: (error) => {
      },
    });
  }

  getTiposMascota() {
    this.tipoMascotaService.getAll().subscribe({
      next: (data) => {
        this.tiposMascota = data;
      },
      error: (error) => {
      },
    });
  }

  beforeUpload = (file: NzUploadFile): boolean => {

    this.fileList = [file];
    this.formData.append('file', file as any);
    return false; // Evita la carga automática
  };

  handleChange(info: { file: NzUploadFile }): void {
    if (info.file.status === 'removed') {
    }
  }

  submitForm() {
    const nuevaMascota = this.formMascota.value;
    nuevaMascota.usuario = this.localStorageService.getIdUsuario();
    if(this.mascota == null) {
      this.mascotaService.post(nuevaMascota).subscribe({
        next: (data: any) => {
          this.mascotaService.postImagenMascota(data._id, this.formData).subscribe({
            next: (data) => {
              console.log('Imagen subida con éxito');
            },
            error: (error) => {
              console.log('Error al subir la imagen');
            },
          });
          this.msg.success('Mascota creada con éxito');
        },
        error: (error) => {
          this.msg.error('Error al crear la mascota');
        },
      });
    } else {
      console.log('Actualizando mascota');
      this.mascotaService.put(nuevaMascota, this.mascota._id).subscribe({
        next: (data: any) => {
          this.mascotaService.postImagenMascota(data._id, this.formData).subscribe({
            next: (data) => {
              console.log('Imagen subida con éxito');
            },
            error: (error) => {
              console.log('Error al subir la imagen');
            },
          });
          this.msg.success('Mascota actualizada con éxito');
        }
      });
    }
    this.handleCancel();
  }

  handleOk(): void {
    this.submitForm();
  }

  handleCancel(): void {
    this.modalService.hideModal();
    this.recargarMascotas.emit();
  }
}
