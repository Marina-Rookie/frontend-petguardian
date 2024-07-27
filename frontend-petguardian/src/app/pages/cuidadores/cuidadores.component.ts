import { Component } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CardCuidadorComponent } from '../../components/card-cuidador/card-cuidador.component';

@Component({
  selector: 'app-cuidadores',
  standalone: true,
  imports: [NzGridModule, CardCuidadorComponent],
  templateUrl: './cuidadores.component.html',
  styleUrl: './cuidadores.component.scss'
})
export class CuidadoresComponent {

}
