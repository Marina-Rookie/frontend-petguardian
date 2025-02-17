import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { StatsCuidadoresComponent } from '../../components/stats-cuidadores/stats-cuidadores.component';
import {
  Cuidador,
  CuidadorInforme,
  Estadisticas,
} from '../../models/CuidadorInforme';
import { InformeService } from '../../services/informe.service';
import { NzMessageService } from 'ng-zorro-antd/message';

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
    StatsCuidadoresComponent,
  ],
  templateUrl: './informes.component.html',
  styleUrl: './informes.component.scss',
})
export class InformesComponent {
  informe: CuidadorInforme;
  estadisticas: Estadisticas = {
    cuidadoresPendientes: 0,
    cuidadoresHabilitados: 0,
    cuidadoresNoHabilitados: 0,
    totalCuidadores: 0,
    cuidadoresFiltrados: 0,
    promedioPuntuacionHabilitados: 0,
  };

  expandSet = new Set<string>();

  onExpandChange(id: string, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  searchValue = '';
  selectedStatus = 'Habilitado';
  listCuidadores: Cuidador[] = [];

  constructor(
    private informeService: InformeService,
    private msg: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getInformes();
  }

  getInformes() {
    const filtros = {
      nombre: this.searchValue,
      estado: this.selectedStatus,
    };

    this.informeService.getInformesCuidadores(filtros).subscribe({
      next: (data: CuidadorInforme) => {
        this.informe = data;
        this.listCuidadores = data.cuidadores;
        this.estadisticas = data.estadisticas;
        console.log(data);
      },
      error: (error) => {
        this.msg.error('Ha ocurrido un error al obtener los informes');
        console.error(error);
      },
    });
  }

  search(): void {
    this.getInformes();
  }
}
