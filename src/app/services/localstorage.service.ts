import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  crearValues() {
    localStorage.removeItem('token');
    localStorage.removeItem('idUsuario');
    localStorage.removeItem('rol');
  }

  setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getIdUsuario() {
    return localStorage.getItem('idUsuario') ?? '';
  }

  getIsCliente() {
    return localStorage.getItem('rol') === 'Cliente';
  }

  getIsCuidadorPendiente() {
    return localStorage.getItem('rol') === 'Cuidador Pendiente';
  }

  getIsCuidador() {
    return localStorage.getItem('rol') === 'Cuidador Habilitado' || localStorage.getItem('rol') === 'Cuidador Pendiente';
  }

  getIsAdmin() {
    return localStorage.getItem('rol') === 'Administrador';
  }
}
