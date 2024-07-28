import { Component } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CardMascotaComponent } from '../../components/card-mascota/card-mascota.component';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterModule } from '@angular/router';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mascotas',
  standalone: true,
  imports: [NzGridModule, CardMascotaComponent, NzPageHeaderModule, NzSpaceModule, NzButtonModule, RouterModule, NzRateModule, CommonModule],
  templateUrl: './mascotas.component.html',
  styleUrl: './mascotas.component.scss'
})
export class MascotasComponent {

}
