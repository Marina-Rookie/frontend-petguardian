import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';


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
}
