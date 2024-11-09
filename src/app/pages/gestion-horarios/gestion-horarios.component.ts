import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { en_US, NzI18nService } from 'ng-zorro-antd/i18n';
import { NgZorroModule } from '../../ngzorro.module';
import { DisponibilidadService } from '../../services/disponibilidadhoraria.service';
import { LocalStorageService } from '../../services/localstorage.service';
import { FiltrarPorFechaPipe } from '../../pipes/filtrar-fecha.pipe';
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
    private disponibilidadService: DisponibilidadService
  ) {}

  ngOnInit() {
    this.i18n.setLocale(en_US);
    this.getDisponiblidad();
  }

  onDateSelect(date: Date): void {
    this.date = date;
    this.turnosDisponibles = [];
    this.generarTurnos();
  }

  getDisponiblidad() {
    this.disponibilidadService.getAll().subscribe({
      next: (response) => {
        this.disponibilidadHoraria = response;
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  // generarTurnos(): void {
  //   this.turnosDisponibles = [];
  //   for (let i = 7; i < 22; i++) {
  //     this.turnosDisponibles.push({ hora: i, selected: false });
  //   }
  // }

  generarTurnos(): void {
    this.turnosDisponibles = [];

    // for (let d = new Date(hoy); d <= unMesDespues; d.setDate(d.getDate() + 1)) {
    this.disponibilidadHoraria.forEach((disp) => {
      const fecha = new Date(disp.fecha);
      disp.horas.forEach((hora) => {
        const selected = true;
        this.turnosDisponibles.push({ fecha, hora: parseInt(hora), selected });
      });
    });

    // for (let i = 7; i < 22; i++) {
    //   const fecha = new Date();
    //   const disponibilidad = this.disponibilidadHoraria.find(
    //     disp => new Date(disp.fecha).toDateString() === fecha.toDateString()
    //   )
    //   const selected = disponibilidad ? disponibilidad.horas.includes(i.toString()) : false;
    //   this.turnosDisponibles.push({ fecha, hora: i, selected });
    // }
    //}
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
        horaInicio: turno.hora,
      }));

    console.log('Turnos guardados:', turnosSeleccionados);

    const nuevaDisponibilidad = {
      fecha: this.date,
      horarios: turnosSeleccionados,
    };

    console.log(nuevaDisponibilidad);
    this.disponibilidadService.postTurnos(nuevaDisponibilidad).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  dateCellRender = (date: Date): string => {
    if (
      date.getMonth() === this.currentMonth &&
      date.getFullYear() === this.currentYear
    ) {
    for (const disp of this.disponibilidadHoraria) {
      console.log(disp);
      if (this.compareDates(date, new Date(disp.fecha))) {
        //console.log('entro')
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
