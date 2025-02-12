import { Component, type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { StatsCuidadoresComponent } from '../../components/stats-cuidadores/stats-cuidadores.component';

interface CaregiverData {
  id: number;
  fechaRegistro: string;
  nombre: string;
  email: string;
  telefono: string;
  estado: string;
  tarifa?: string;
  puntuacion?: number;
  cantidadReservas?: number;
  reservasPendientes?: number;
  reservasAprobadas?: number;
  reservasNoAprobadas?: number;
  reservasCanceladas?: number;
  reservasFinalizadas?: number;
}

@Component({
  selector: 'app-informes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzTypographyModule,
    NzIconModule,
    NzDividerModule,
    StatsCuidadoresComponent
  ],
  templateUrl: './informes.component.html',
  styleUrl: './informes.component.scss',
})
export class InformesComponent {

  expandSet = new Set<number>();

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  searchValue = '';
  selectedStatus = 'Todos';
  listOfData: CaregiverData[] = [
    {
      id: 1,
      fechaRegistro: '2024-08-20',
      nombre: 'Esteban Díaz',
      email: 'esteban@gmail.com',
      telefono: '3413784512',
      estado: 'Pendiente',
      tarifa: '20 USD/h',
      puntuacion: 4.5,
      cantidadReservas: 10,
      reservasPendientes: 2,
      reservasAprobadas: 5,
      reservasNoAprobadas: 1,
      reservasCanceladas: 1,
      reservasFinalizadas: 1,
    },
    {
      id: 2,
      fechaRegistro: '2024-10-02',
      nombre: 'Marina Panatti',
      email: 'marin@outlook.com',
      telefono: '3413384555',
      estado: 'Pendiente',
      tarifa: '18 USD/h',
      puntuacion: 4.7,
      cantidadReservas: 8,
      reservasPendientes: 1,
      reservasAprobadas: 4,
      reservasNoAprobadas: 1,
      reservasCanceladas: 1,
      reservasFinalizadas: 1,
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  search(): void {
    // Implement search logic
  }
}
