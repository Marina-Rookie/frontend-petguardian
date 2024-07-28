import { Component } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CardMascotaComponent } from '../../components/card-mascota/card-mascota.component';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mascotas',
  standalone: true,
  imports: [NzGridModule, CardMascotaComponent, NzPageHeaderModule, NzSpaceModule, NzButtonModule, RouterModule],
  templateUrl: './mascotas.component.html',
  styleUrl: './mascotas.component.scss'
})
export class MascotasComponent {

}
