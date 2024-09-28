import { Component, OnInit } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CardCuidadorComponent } from '../../components/card-cuidador/card-cuidador.component';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { Cuidador } from '../../models/Cuidador';

@Component({
  selector: 'app-cuidadores',
  standalone: true,
  imports: [NzGridModule, CardCuidadorComponent, CommonModule],
  templateUrl: './cuidadores.component.html',
  styleUrl: './cuidadores.component.scss',
})
export class CuidadoresComponent implements OnInit {
  cuidadores: Cuidador[] = [];

  constructor(private service: ApiService) {}

  ngOnInit() {
    this.getCuidadores();
  }

  getCuidadores() {
    this.service.get('usuarios/cuidadores-habilitados').subscribe({
      next: (data: any) => {
        console.log(data)
        this.cuidadores = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
