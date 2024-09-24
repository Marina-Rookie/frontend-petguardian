import { Component, Input, OnInit } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule } from 'ng-zorro-antd/image';
import { Mascota } from '../../models/Mascota';
import { ModalService } from '../../services/shared/modals.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-card-mascota',
  standalone: true,
  imports: [NzCardModule, NzButtonModule, NzIconModule, NzImageModule],
  templateUrl: './card-mascota.component.html',
  styleUrl: './card-mascota.component.scss'
})
export class CardMascotaComponent implements OnInit {
  @Input() mascota: Mascota | undefined;

  constructor(private modalService: ModalService, private service: ApiService) {}

  ngOnInit(): void {}

  editMascota(){
    this.modalService.showModal();
    this.modalService.setMascotaEditModal(this.mascota);
  }

  eliminarMascota() {
    this.service.delete('mascotas/' + this.mascota?._id).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
