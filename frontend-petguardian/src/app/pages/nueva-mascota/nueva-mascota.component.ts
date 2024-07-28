import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-nueva-mascota',
  standalone: true,
  imports: [CommonModule, NzGridModule, NzFormModule, NzInputModule, NzButtonModule, NzSelectModule],
  templateUrl: './nueva-mascota.component.html',
  styleUrl: './nueva-mascota.component.scss'
})
export class NuevaMascotaComponent {

}
