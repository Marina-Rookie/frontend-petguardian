import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Cuidador } from '../../models/Cuidador';
import { NgZorroModule } from '../../ngzorro.module';
import { ModalReservaComponent } from '../modal-reserva/modal-reserva.component';
import { ModalService } from '../../services/shared/modals.service';

@Component({
  selector: 'app-card-cuidador',
  standalone: true,
  imports: [
    NgZorroModule,
    CommonModule,
    RouterModule,
    ModalReservaComponent
  ],
  templateUrl: './card-cuidador.component.html',
  styleUrl: './card-cuidador.component.scss',
})
export class CardCuidadorComponent {
  @Input() cuidador: Cuidador = new Cuidador('', '', '', '', '', '', 0, '');

  constructor(private modalService: ModalService) {}

  ngOnInit() {
  }

  showModal(): void {
    this.modalService.showReservaModal();
  }
}
