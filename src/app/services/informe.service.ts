import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class InformeService extends ApiService<any>{

  authURL = environment.url_server;

  constructor(http: HttpClient) {
    super(http, `${environment.url_server}` + 'informes');
  }

  getInformesCuidadores(filtros: { nombre?: string; apellido?: string; email?: string; estado?: string }) {
    let params = new HttpParams();
    if (filtros.nombre) {
      params = params.set('nombre', filtros.nombre);
    }
    if (filtros.apellido) {
      params = params.set('apellido', filtros.apellido);
    }
    if (filtros.email) {
      params = params.set('email', filtros.email);
    }
    if (filtros.estado) {
      params = params.set('estado', filtros.estado);
    }

    return this.http.get(`${this.authURL}informes/cuidadores-con-reservas`, { params });
  }
}
