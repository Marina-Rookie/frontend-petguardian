import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { es_ES, NzI18nService } from 'ng-zorro-antd/i18n';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgZorroModule } from '../../ngzorro.module';
import { DisponibilidadService } from '../../services/disponibilidadhoraria.service';
interface DisponibilidadHoraria {
  _id: string;
  fecha: Date;
  horas: string[];
}
interface Turno {
  fecha: Date;
  hora: number;
  selected: boolean;
}
@Component({
  selector: 'app-gestion-horarios',
  standalone: true,
  imports: [NgZorroModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './gestion-horarios.component.html',
  styleUrl: './gestion-horarios.component.scss',
})
export class GestionHorariosComponent {
  date = new Date();
  currentMonth: number = this.date.getMonth();
  currentYear: number = this.date.getFullYear();
  turnosDisponibles: Turno[] = [];
  disponibilidadHoraria: DisponibilidadHoraria[] = [];

  constructor(
    private i18n: NzI18nService,
    private disponibilidadService: DisponibilidadService,
    private msg: NzMessageService,
  ) {}

  ngOnInit() {
    this.i18n.setLocale(es_ES);
    this.getDisponiblidad();
  }

  onDateSelect(date: Date): void {
    this.date = date;
    this.turnosDisponibles = [];
    this.generarTurnos(date);
  }

  getDisponiblidad() {
    this.disponibilidadService.getAll().subscribe({
      next: (response) => {
        this.disponibilidadHoraria = response;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  generarTurnos(date: Date): void {
    this.turnosDisponibles = [];
    const disponibilidad = this.disponibilidadHoraria.find(
      (disp) => this.compareDates(date, new Date(disp.fecha))
    );
    for (let i = 7; i < 22; i++) {
      const selected = disponibilidad ? disponibilidad.horas.includes(i.toString()) : false;
      this.turnosDisponibles.push({ fecha: date, hora: i, selected });
    }
  }

  disabledDate = (current: Date): boolean => {
    return current <= new Date();
  };

  guardarTurnos(): void {
    const turnosSeleccionados = this.turnosDisponibles
      .filter((turno) => turno.selected)
      .map((turno) => ({
        horaInicio: turno.hora,
      }));

    const nuevaDisponibilidad = {
      fecha: this.date,
      horarios: turnosSeleccionados,
    };

    this.disponibilidadService.postTurnos(nuevaDisponibilidad).subscribe({
      next: (response) => {
        this.msg.success('Turnos guardados correctamente');
        this.getDisponiblidad();
      },
      error: (error) => {
        this.msg.error('Error al guardar los turnos');
      },
    }
    );
  }

  dateCellRender = (date: Date): string => {
    if (
      date.getMonth() === this.currentMonth &&
      date.getFullYear() === this.currentYear
    ) {
    for (const disp of this.disponibilidadHoraria) {
      if (this.compareDates(date, new Date(disp.fecha))) {
        const horasSeleccionadas = disp.horas.join(', ');
        return `
        <div class="turnos-dia">
          Turnos: ${horasSeleccionadas}
        </div>
      `;
      }
    }
    };
    return '';
  };

  compareDates(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  onMonthChange(date: Date) {
    this.currentMonth = date.getMonth();
    this.currentYear = date.getFullYear();
  }
}
