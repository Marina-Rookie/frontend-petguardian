import { Component, Input } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Cuidador } from '../../models/Cuidador';
import { Resenia } from '../../models/Resenia';
import { NgZorroModule } from '../../ngzorro.module';
import { ReseniaService } from '../../services/resenia.service';
import { ModalService } from '../../services/shared/modals.service';

@Component({
  selector: 'app-modal-resenia',
  standalone: true,
  imports: [NgZorroModule],
  templateUrl: './modal-resenia.component.html',
  styleUrl: './modal-resenia.component.scss'
})
export class ModalReseniaComponent {

  @Input() cuidador: Cuidador = new Cuidador('', '', '', '', '', '', 0, '');
  resenias: Resenia[] = [];
  isVisible = false;

  constructor(private reseniaService: ReseniaService, private msg: NzMessageService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.modalService.reseniasModal$.subscribe((isVisible) => {
      console.log(isVisible);
      this.isVisible = isVisible;
      if(isVisible) this.getResenias();
    });
  }

  getResenias() {
    this.reseniaService.getReseniasPorCuidador(this.cuidador._id).subscribe({
      next: (resenias: Resenia[]) => {
        this.resenias = resenias;
      },
      error: (err) => {
        this.resenias = [];
        console.log(err);
      }
    });
  }

  handleOk(): void {
    this.resenias = [];
    this.modalService.hideReseniasModal();
  }

  handleCancel(): void {
    this.resenias = [];
    this.modalService.hideReseniasModal();
  }
}
