import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule } from 'ng-zorro-antd/image';
import { Mascota } from '../../models/Mascota';
import { ModalService } from '../../services/shared/modals.service';
import { ApiService } from '../../services/api.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MascotaService } from '../../services/mascota.service';

@Component({
  selector: 'app-card-mascota',
  standalone: true,
  imports: [NzCardModule, NzButtonModule, NzIconModule, NzImageModule],
  templateUrl: './card-mascota.component.html',
  styleUrl: './card-mascota.component.scss',
})
export class CardMascotaComponent implements OnInit {
  @Input() mascota!: Mascota;
  @Output() recargarMascotas = new EventEmitter<true>();

  idMascota: string = '';
  constructor(
    private modalService: ModalService,
    private service: MascotaService,
    private msg: NzMessageService
  ) {}

  ngOnInit(): void {
    this.idMascota = this.mascota._id;
    this.mascota.urlImagen = this.mascota.urlImagen ? this.mascota.urlImagen : 'https://res.cloudinary.com/dddkkhrih/image/upload/v1729643117/fsn7sjzhcpzwo3qccpud.jpg';
  }

  editMascota() {
    this.modalService.showModal();
    this.modalService.setMascotaEditModal(this.mascota);
  }

  eliminarMascota() {
    this.service.delete(this.mascota._id).subscribe({
      next: (data) => {
        this.msg.success('Mascota eliminada con éxito');
        this.recargarMascotas.emit(true);
      },
      error: (error) => {
        this.msg.error('Error al eliminar la mascota');
      },
    });
  }
}
