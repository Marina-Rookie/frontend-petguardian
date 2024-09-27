import { Component } from '@angular/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
interface Reserva {
  id: number;
  fechaInicio: string;
  fechaFin: string;
  estado: string;
  cuidador: string;
  mascotas: string;
  precio: number;
  puntuacion: number;
}
@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [NzGridModule, NzAvatarModule, NzFormModule, NzTableModule, NzIconModule, NzButtonModule],
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.scss'
})
export class ReservaComponent {
  reservas: Reserva[] = [
    {
      id: 1,
      fechaInicio: '2023-10-01',
      fechaFin: '2023-10-07',
      estado: 'Confirmada',
      cuidador: 'Juan Pérez',
      mascotas: 'Perro, Gato',
      precio: 150.00,
      puntuacion: 4.5
    },
    {
      id: 2,
      fechaInicio: '2023-11-15',
      fechaFin: '2023-11-20',
      estado: 'Pendiente',
      cuidador: 'María López',
      mascotas: 'Perro',
      precio: 100.00,
      puntuacion: 4.0
    },
    {
      id: 3,
      fechaInicio: '2023-12-01',
      fechaFin: '2023-12-05',
      estado: 'Cancelada',
      cuidador: 'Carlos García',
      mascotas: 'Gato',
      precio: 80.00,
      puntuacion: 3.5
    }
  ];
}
