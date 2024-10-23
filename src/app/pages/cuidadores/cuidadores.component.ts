import { Component, OnInit } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CardCuidadorComponent } from '../../components/card-cuidador/card-cuidador.component';
import { CommonModule } from '@angular/common';
import { Cuidador } from '../../models/Cuidador';
import { CuidadorService } from '../../services/cuidador.service';

@Component({
  selector: 'app-cuidadores',
  standalone: true,
  imports: [NzGridModule, CardCuidadorComponent, CommonModule],
  templateUrl: './cuidadores.component.html',
  styleUrl: './cuidadores.component.scss',
})
export class CuidadoresComponent implements OnInit {
  cuidadores: Cuidador[] = [];

  constructor(private cuidadorService: CuidadorService) {}

  ngOnInit() {
    this.getCuidadores();
  }

  getCuidadores() {
    this.cuidadorService.getCuidadoresHabilitados().subscribe((cuidadores) => {
      this.cuidadores = cuidadores;
    });
  }
}
