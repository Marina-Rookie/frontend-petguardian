import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from '../../services/localstorage.service';
import { Reserva } from '../../models/Reserva';
import { ReservaService } from '../../services/reserva.service';
import { NgZorroModule } from '../../ngzorro.module';


@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [NgZorroModule, CommonModule, FormsModule],
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.scss'
})
export class ReservaComponent {

  isVisible = false;
  puntuacion = 0;
  comentario = '';
  idCliente: string = '';
  reservas: Reserva[] = [];
  loading: boolean = false;

  constructor(private service: ReservaService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.idCliente = this.localStorageService.getIdUsuario();
    this.getReservas();
  }

  getReservas(): void {
    this.loading = true;
    this.service.getReservasPorCliente(this.idCliente).subscribe({
      next: (data: Reserva[]) => {
        this.reservas = data;
        this.loading = false;
      },
      error: (error: any) => {
        this.loading = false;
      }
     });
  }

  openModal(reserva: Reserva): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  cancelarReserva(reserva: Reserva): void {
    this.service.cancelarReserva(reserva._id).subscribe({
      next: (data: any) => {
        this.getReservas();
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }
}
