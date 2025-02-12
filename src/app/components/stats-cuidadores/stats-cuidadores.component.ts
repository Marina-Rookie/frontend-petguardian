import { Component } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';

@Component({
  selector: 'app-stats-cuidadores',
  standalone: true,
  imports: [NzCardModule, NzStatisticModule, NzIconModule],
  templateUrl: './stats-cuidadores.component.html',
  styleUrl: './stats-cuidadores.component.scss',
})
export class StatsCuidadoresComponent {
  statistics = {
    pendientes: 2,
    habilitados: 26,
    noHabilitados: 7,
    puntuacionPromedio: 4.54,
  };
}
