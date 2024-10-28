import { Component, OnInit } from '@angular/core';
import { NgZorroModule } from '../../ngzorro.module';
import { Cuidador } from '../../models/Cuidador';
import { CuidadorService } from '../../services/cuidador.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-aprobar-cuidadores',
  standalone: true,
  imports: [NgZorroModule],
  templateUrl: './aprobar-cuidadores.component.html',
  styleUrl: './aprobar-cuidadores.component.scss'
})
export class AprobarCuidadoresComponent implements OnInit {
  cuidadoresPendientes: Cuidador[] = [];

  constructor(private service: CuidadorService, private msg: NzMessageService) {
  }

  ngOnInit() {
    this.getCuidadoresPendientes();
  }

  getCuidadoresPendientes() {
    this.service.getCuidadoresPendientes().subscribe((cuidadores: Cuidador[]) => {
      this.cuidadoresPendientes = cuidadores;
    });
  }
  aprobar(cuidador: Cuidador) {
    this.service.habilitarCuidador(cuidador._id).subscribe(() => {
      this.getCuidadoresPendientes();
      this.msg.success('Cuidador aprobado');
    });
  }

  rechazar(cuidador: Cuidador) {
    this.service.desaprobarCuidador(cuidador._id).subscribe(() => {
      this.getCuidadoresPendientes();
      this.msg.success('Cuidador rechazado');
    });
  }
}
