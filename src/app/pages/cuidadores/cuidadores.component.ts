import { Component, OnInit } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CardCuidadorComponent } from '../../components/card-cuidador/card-cuidador.component';
import { CommonModule } from '@angular/common';
import { Cuidador } from '../../models/Cuidador';
import { CuidadorService } from '../../services/cuidador.service';
import { NgZorroModule } from '../../ngzorro.module';

@Component({
  selector: 'app-cuidadores',
  standalone: true,
  imports: [NgZorroModule, CardCuidadorComponent, CommonModule],
  templateUrl: './cuidadores.component.html',
  styleUrl: './cuidadores.component.scss',
})
export class CuidadoresComponent implements OnInit {
  cuidadores: Cuidador[] = [];
  loading: boolean = false;

  constructor(private cuidadorService: CuidadorService) {}

  ngOnInit() {
    this.getCuidadores();
  }

  getCuidadores() {
    this.loading = true;
    this.cuidadorService.getCuidadoresHabilitados().subscribe({
      next: (cuidadores) => {
        this.cuidadores = cuidadores;
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
      },
    });
  }
}
