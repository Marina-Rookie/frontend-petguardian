import { Component } from '@angular/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { LocalStorageService } from '../../services/localstorage.service';
import { Reserva } from '../../models/Reserva';


@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [NzGridModule, NzAvatarModule, NzFormModule, NzTableModule,NzInputModule, NzIconModule, NzButtonModule,NzModalModule, NzRateModule, CommonModule, FormsModule],
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.scss'
})
export class ReservaComponent {

  isVisible = false;
  puntuacion = 0;
  comentario = '';
  idCliente: string = '';
  reservas: Reserva[] = [];

  constructor(private apiService: ApiService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.idCliente = this.localStorageService.getIdUsuario();
    this.getReservas();
  }

  getReservas(): void {
    this.apiService.get('reservas/reservasPorCliente/' + this.idCliente).subscribe({
      next: (data: Reserva[]) => {
        this.reservas = data;
      },
      error: (error: any) => {
        console.error(error);
      }
     });
  }

  openModal(reserva: Reserva): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
