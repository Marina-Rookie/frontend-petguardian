import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Cuidador } from '../../models/Cuidador';
import { NgZorroModule } from '../../ngzorro.module';
import { ModalReservaComponent } from '../modal-reserva/modal-reserva.component';
import { ModalService } from '../../services/shared/modals.service';
import { ModalReseniaComponent } from '../modal-resenia/modal-resenia.component';

@Component({
  selector: 'app-card-cuidador',
  standalone: true,
  imports: [
    NgZorroModule,
    CommonModule,
    RouterModule,
    ModalReservaComponent,
    ModalReseniaComponent
  ],
  templateUrl: './card-cuidador.component.html',
  styleUrl: './card-cuidador.component.scss',
})
export class CardCuidadorComponent {
  @Input() cuidador: Cuidador = new Cuidador('', '', '', '', '', '', 0, '');
  urlPerfil: string = 'https://res.cloudinary.com/dddkkhrih/image/upload/v1729643117/fsn7sjzhcpzwo3qccpud.jpg';
  constructor(private modalService: ModalService) {}

  ngOnInit() {
    if(this.cuidador.imagenPerfil != '' && this.cuidador.imagenPerfil != null) {
      this.urlPerfil = this.cuidador.imagenPerfil;
    }
  }

  showModal(): void {
    this.modalService.showReservaModal();
  }

  showModalResenias(): void {
    this.modalService.showReseniasModal();
  }
}
