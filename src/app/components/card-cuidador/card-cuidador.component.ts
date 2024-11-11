import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Cuidador } from '../../models/Cuidador';
import { NgZorroModule } from '../../ngzorro.module';
import { ModalService } from '../../services/shared/modals.service';

@Component({
  selector: 'app-card-cuidador',
  standalone: true,
  imports: [
    NgZorroModule,
    CommonModule
  ],
  templateUrl: './card-cuidador.component.html',
  styleUrl: './card-cuidador.component.scss',
})
export class CardCuidadorComponent {
  @Input() cuidador: Cuidador = new Cuidador('', '', '', '', '', '', 0, '');
  urlPerfil: string = 'https://res.cloudinary.com/dddkkhrih/image/upload/v1729643117/fsn7sjzhcpzwo3qccpud.jpg';
  constructor(private modalService: ModalService) {}

  ngOnInit() {
  }

  showModal(): void {
    this.modalService.showReservaModal();
    this.modalService.setCuidadorReservaModal(this.cuidador);
  }

  showModalResenias(): void {
    this.modalService.showReseniasModal();
    this.modalService.setCuidadorReseniasModal(this.cuidador);
  }
}
