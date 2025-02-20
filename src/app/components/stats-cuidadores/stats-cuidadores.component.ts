import { Component, Input } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { Estadisticas } from '../../models/CuidadorInforme';

@Component({
  selector: 'app-stats-cuidadores',
  standalone: true,
  imports: [NzCardModule, NzStatisticModule, NzIconModule],
  templateUrl: './stats-cuidadores.component.html',
})
export class StatsCuidadoresComponent {

  @Input() estadisticas: Estadisticas;
  
}
