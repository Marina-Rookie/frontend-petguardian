import { Component, HostListener } from '@angular/core';
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
  isMobile: boolean = window.innerWidth <= 768;

  constructor(
    private service: ReservaService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.idCliente = this.localStorageService.getIdUsuario();
    this.getReservas();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = event.target.innerWidth <= 768;
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

  getStatus(estado: string): string {
    switch (estado) {
      case 'Cancelada':
      case 'No aprobada':
        return 'error';
      case 'Pendiente':
        return 'processing';
      case 'Finalizada':
      case 'Aprobada':
        return 'success';
      default:
        return 'default';
    }
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
      next: () => this.getReservas(),
      error: (error: any) => console.error(error)
    });
  }
}