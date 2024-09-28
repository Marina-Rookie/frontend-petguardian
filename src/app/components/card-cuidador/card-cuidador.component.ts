import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule } from 'ng-zorro-antd/image';

@Component({
  selector: 'app-card-cuidador',
  standalone: true,
  imports: [NzCardModule, NzButtonModule, NzImageModule, NzIconModule, CommonModule, RouterModule],
  templateUrl: './card-cuidador.component.html',
  styleUrl: './card-cuidador.component.scss'
})
export class CardCuidadorComponent {
}
