import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment.prod';
import { Cuidador } from '../models/Cuidador';

@Injectable({
  providedIn: 'root'
})
export class CuidadorService extends ApiService<Cuidador>{

  authURL = environment.url_server;

  constructor(http: HttpClient) {
    super(http, `${environment.url_server}` + 'usuarios');
  }

  getCuidadoresHabilitados(): Observable<Cuidador[]> {
    return this.http.get<Cuidador[]>(`${this.authURL}usuarios/cuidadores-habilitados`);
  }

  getCuidadoresPendientes(): Observable<Cuidador[]> {
    return this.http.get<Cuidador[]>(`${this.authURL}usuarios/cuidadores-pendientes`);
  }

  habilitarCuidador(id: string): Observable<Cuidador> {
    return this.http.put<Cuidador>(`${this.authURL}usuarios/habilitar-cuidador/${id}`, {});
  }

  desaprobarCuidador(id: string): Observable<Cuidador> {
    return this.http.put<Cuidador>(`${this.authURL}usuarios/desaprobar-cuidador/${id}`, {});
  }
}
