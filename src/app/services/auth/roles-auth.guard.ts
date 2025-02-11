import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { LocalStorageService } from '../localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class RolGuard implements CanActivate {

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles = route.data['expectedRoles'] as Array<string>;
    const userRole = this.localStorageService.getRol();
    console.log('userRole', userRole);
    if (this.isValidRole(userRole, expectedRoles)) {
      return true;
    } else {
        console.log('No tienes permisos para acceder a esta página');
      this.router.navigate(['/perfil/' + this.localStorageService.getIdUsuario()]);
      return false;
    }
  }

  private isValidRole(userRole: string, expectedRoles: Array<string>): boolean {
    return expectedRoles.includes(userRole);
  }
}
