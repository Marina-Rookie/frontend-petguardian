import { Component, OnInit } from '@angular/core';
import { Cuidador } from '../../models/Cuidador';
import { Resenia } from '../../models/Resenia';
import { NgZorroModule } from '../../ngzorro.module';
import { ReseniaService } from '../../services/resenia.service';
import { ModalService } from '../../services/shared/modals.service';

@Component({
  selector: 'app-modal-resenia',
  standalone: true,
  imports: [NgZorroModule],
  templateUrl: './modal-resenia.component.html'
})
export class ModalReseniaComponent implements OnInit {

  cuidador = {} as Cuidador;
  resenias: Resenia[] = [];
  isVisible = false;
  loading = false;

  constructor(private reseniaService: ReseniaService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.modalService.reseniasModal$.subscribe((isVisible) => {
      this.isVisible = isVisible;
    });
    this.modalService.cuidadorReseniasModal$.subscribe((cuidador) => {
      if (cuidador === null) return;
      this.cuidador = cuidador;
      this.getResenias();
    });
  }

  getResenias() {
    this.loading = true;
    this.reseniaService.getReseniasPorCuidador(this.cuidador._id).subscribe({
      next: (resenias: Resenia[]) => {
        this.resenias = resenias;
        this.loading = false;
      },
      error: (err) => {
        this.resenias = [];
        this.loading = false;
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
