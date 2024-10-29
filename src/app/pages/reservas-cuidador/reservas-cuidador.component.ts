import { Component } from '@angular/core';
import { NgZorroModule } from '../../ngzorro.module';
import { ReservaService } from '../../services/reserva.service';
import { Reserva } from '../../models/Reserva';
import { LocalStorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-reservas-cuidador',
  standalone: true,
  imports: [NgZorroModule],
  templateUrl: './reservas-cuidador.component.html',
  styleUrl: './reservas-cuidador.component.scss'
})
export class ReservasCuidadorComponent {

  loading: boolean = false;
  reservas: Reserva[] = [];
  idCuidador: string = '';

  constructor(private service: ReservaService, private localstorage: LocalStorageService) { }

  ngOnInit(): void {
    this.idCuidador = this.localstorage.getIdUsuario();
    this.getReservas();
  }

  getReservas() {
    this.loading = true;
    this.service.getReservasPorCuidador(this.idCuidador).subscribe(res => {
      this.reservas = res;
      this.loading = false;
    });
  }
}
