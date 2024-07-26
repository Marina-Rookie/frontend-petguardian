import { Component } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CardMascotaComponent } from '../../components/card-mascota/card-mascota.component';

@Component({
  selector: 'app-mascotas',
  standalone: true,
  imports: [NzGridModule, CardMascotaComponent],
  templateUrl: './mascotas.component.html',
  styleUrl: './mascotas.component.scss'
})
export class MascotasComponent {

}
