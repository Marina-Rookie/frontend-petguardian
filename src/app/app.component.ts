import { CommonModule } from '@angular/common';
import { Component, HostListener, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NgZorroModule } from './ngzorro.module';
import { LocalStorageService } from './services/localstorage.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    NgZorroModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('drawer') drawer!: MatSidenav;
  isMobile: boolean = false;
  drawerOpened: boolean = true;

  constructor(public localstorage: LocalStorageService, private router: Router) {
    this.checkScreenSize();
  }

  userIsLogged(): boolean {
    return this.localstorage.getItem('token') != undefined;
  }

  isRoleValid() {
    if(this.localstorage.getRol() == ''){
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
    if (this.isMobile) {
      this.drawerOpened = false;
    }
  }

  closeSidenavIfMobile() {
    if (this.isMobile) {
      this.drawer.close();
    }
  }

  getIsCliente() {
    return this.localstorage.getIsCliente();
  }

  getIsCuidador() {
    return this.localstorage.getIsCuidador();
  }

  getIsAdmin() {
    return this.localstorage.getIsAdmin();
  }

  getIsCuidadorHabilitado() {
    return this.localstorage.getIsCuidadorHabilitado();
  }
}
