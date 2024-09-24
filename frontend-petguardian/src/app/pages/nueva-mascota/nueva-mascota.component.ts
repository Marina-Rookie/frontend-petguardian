import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { ApiService } from '../../services/api.service';
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
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ModalService } from '../../services/shared/modals.service';
import { Mascota } from '../../models/Mascota';

@Component({
  selector: 'app-nueva-mascota',
  standalone: true,
  imports: [
    CommonModule,
    NzGridModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    NzFormModule,
    NzAvatarModule,
    NzUploadModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzModalModule
  ],
  templateUrl: './nueva-mascota.component.html',
  styleUrl: './nueva-mascota.component.scss',
})
export class NuevaMascotaComponent implements OnInit {

  @Input() idMascota: number = 0;
  @Output() nuevaMascota: EventEmitter<any> = new EventEmitter<any>();
  loading = false;
  avatarUrl?: string;
  mascota: any;
  tiposMascota: TipoMascota[] = [];
  etapasVida: EtapaVida[] = [];
  formMascota: FormGroup = new FormGroup({});
  isVisible = false;

  constructor(
    private msg: NzMessageService,
    private apiService: ApiService,
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private modalService: ModalService
  ) {
  }

  ngOnInit(): void {
    this.formInit();
    this.modalService.isVisible$.subscribe((isVisible) => {
      console.log("Cambio en la suscripcion")
      this.isVisible = isVisible;
    });
    this.modalService.mascotaEditModal$.subscribe((mascota) => {
      console.log(mascota);
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
      obsOtros: ['']
    });
  }

  getEtapasVidaMascota() {
    this.apiService.get('etapasVida').subscribe({
      next: (data: any) => {
        this.etapasVida = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getTiposMascota() {
    this.apiService.get('tiposMascota').subscribe({
      next: (data: any) => {
        this.tiposMascota = data;
        console.log(this.tiposMascota);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  beforeUpload = (
    file: NzUploadFile,
    _fileList: NzUploadFile[]
  ): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng =
        file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.msg.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.msg.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  handleChange(info: { file: NzUploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
        });
        break;
      case 'error':
        this.msg.error('Network error');
        this.loading = false;
        break;
    }
  }

  submitForm() {
    console.log(this.formMascota.value);
    const nuevaMascota = this.formMascota.value;
    nuevaMascota.usuario = this.localStorageService.getIdUsuario();
    console.log(nuevaMascota);
    this.apiService.post(nuevaMascota, 'mascotas').subscribe({
      next: (data: any) => {
        console.log(data);
        this.msg.success('Mascota creada con éxito');
      },
      error: (error) => {
        console.log(error);
        this.msg.error('Error al crear la mascota');
      },
    });
    this.handleCancel();
  }

  handleOk(): void {
    this.submitForm();
  }

  handleCancel(): void {
    this.modalService.hideModal();
  }
}
