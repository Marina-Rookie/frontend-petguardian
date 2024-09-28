import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule } from 'ng-zorro-antd/image';
import { Cuidador } from '../../models/Cuidador';

@Component({
  selector: 'app-card-cuidador',
  standalone: true,
  imports: [NzCardModule, NzButtonModule, NzImageModule, NzIconModule, CommonModule, RouterModule],
  templateUrl: './card-cuidador.component.html',
  styleUrl: './card-cuidador.component.scss'
})
export class CardCuidadorComponent {
  @Input() cuidador: Cuidador = new Cuidador('','', '', '', '', '', 0);

  constructor() {
  }

  ngOnInit() {
  }

}
