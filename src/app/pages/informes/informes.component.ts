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

interface CaregiverData {
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
    NzDividerModule
  ],
  templateUrl: './informes.component.html',
  styleUrl: './informes.component.scss',
})
export class InformesComponent {
  searchValue = '';
  selectedStatus = 'Todos';
  listOfData: CaregiverData[] = [
    {
      fechaRegistro: '2024-08-20',
      nombre: 'Esteban Díaz',
      email: 'esteban@gmail.com',
      telefono: '3413784512',
      estado: 'Pendiente',
    },
    {
      fechaRegistro: '2024-10-02',
      nombre: 'Marina Panatti',
      email: 'marin@outlook.com',
      telefono: '3413384555',
      estado: 'Pendiente',
    },
  ];

  statistics = {
    pendientes: 2,
    habilitados: 26,
    noHabilitados: 7,
    puntuacionPromedio: 4.54,
  };

  constructor() {}

  ngOnInit(): void {}

  search(): void {
    // Implement search logic
  }
}
