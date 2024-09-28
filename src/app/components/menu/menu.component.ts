import { Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LocalStorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, NzIconModule, NzLayoutModule, NzMenuModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  isCollapsed = false;

  constructor(private localStorage: LocalStorageService) { }

  cerrarSesion() {
    this.localStorage.crearValues();
  }
}
