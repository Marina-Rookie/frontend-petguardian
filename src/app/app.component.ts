import { Component, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { LoginComponent } from './pages/login/login.component';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
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
    LoginComponent,
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

  constructor(public localstorage: LocalStorageService) {
    this.checkScreenSize();
  }

  userIsLogged(): boolean {
    return localStorage.getItem('token') != undefined;
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
}
