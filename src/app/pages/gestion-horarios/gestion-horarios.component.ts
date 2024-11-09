import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroModule } from '../../ngzorro.module';
import { en_US, es_ES, NzI18nService } from 'ng-zorro-antd/i18n';
import { DisponibilidadService } from '../../services/disponibilidadhoraria.service';
import { LocalStorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-gestion-horarios',
  standalone: true,
  imports: [NgZorroModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './gestion-horarios.component.html',
  styleUrl: './gestion-horarios.component.scss',
})
export class GestionHorariosComponent {
  date = new Date();
  turnosDisponibles: { hora: number; selected: boolean }[] = [];

  constructor(
    private i18n: NzI18nService,
    private disponibilidadService: DisponibilidadService,
    private localstorage: LocalStorageService
  ) {}

  ngOnInit() {
    this.i18n.setLocale(en_US);
    this.generarTurnos();
  }

  onDateSelect(date: Date): void {
    this.date = date;
    this.generarTurnos();
  }

  generarTurnos(): void {
    this.turnosDisponibles = [];
    for (let i = 7; i < 22; i++) {
      this.turnosDisponibles.push({ hora: i, selected: false });
    }
  }

  onTurnoChange(turno: { hora: number; selected: boolean }): void {
    console.log(
      `Turno ${turno.hora}:00 - ${turno.hora + 1}:00 ${
        turno.selected ? 'seleccionado' : 'deseleccionado'
      }`
    );
  }

  disabledDate = (current: Date): boolean => {
    return current < new Date();
  };

  guardarTurnos(): void {
    const turnosSeleccionados = this.turnosDisponibles
      .filter((turno) => turno.selected)
      .map((turno) => ({
        fecha: this.date,
        horaInicio: turno.hora,
        horaFin: turno.hora + 1,
      }));

    console.log('Turnos guardados:', turnosSeleccionados);

    const nuevaDisponibilidad = {
      fecha: this.date,
      horarios: turnosSeleccionados,
    };
    console.log(nuevaDisponibilidad);
    this.disponibilidadService
      .postTurnos(nuevaDisponibilidad, this.localstorage.getIdUsuario())
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error(error);
        }
      );
  }
}
