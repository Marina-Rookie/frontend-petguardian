import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  ],
  templateUrl: './nueva-mascota.component.html',
  styleUrl: './nueva-mascota.component.scss',
})
export class NuevaMascotaComponent implements OnInit {
  loading = false;
  avatarUrl?: string;
  tiposMascota: TipoMascota[] = [];

  constructor(private msg: NzMessageService, private apiService: ApiService) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  getTipoMascota(){
    this.apiService.get('tiposMascota').subscribe({
      next: (data: TipoMascota[]) => {
        this.tiposMascota = data;
      },
      error: () => {}
    })
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
}
