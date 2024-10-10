import { Component, Input } from '@angular/core';
import { NgZorroModule } from '../../ngzorro.module';
import { ModalService } from '../../services/shared/modals.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-modal-reserva',
  standalone: true,
  imports: [NgZorroModule],
  templateUrl: './modal-reserva.component.html',
  styleUrl: './modal-reserva.component.scss',
})
export class ModalReservaComponent {

  @Input() cuidador: any = {};

  isVisible = false;
  listOfOption = [{ label: 'mascota1', value: 'Mascota1' }, { label: 'mascota2', value: 'Mascota2' }];
  constructor(
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.modalService.isVisibleModalReserva$.subscribe((isVisible) => {
      this.isVisible = isVisible;
    });
  }

  handleOk(): void {}

  handleCancel(): void {
    this.modalService.hideModal();
  }
}
