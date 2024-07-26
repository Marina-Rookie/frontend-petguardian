import { Component } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
  selector: 'app-card-mascota',
  standalone: true,
  imports: [NzCardModule],
  templateUrl: './card-mascota.component.html',
  styleUrl: './card-mascota.component.scss'
})
export class CardMascotaComponent {

}
