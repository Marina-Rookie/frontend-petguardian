import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment.prod';
import { Turno } from '../models/Turno';

@Injectable({
  providedIn: 'root'
})
export class TurnosService extends ApiService<Turno> {

  authURL = environment.url_server;

  constructor(http: HttpClient) {
    super(http, `${environment.url_server}` + 'turnos');
  }

  postTurnosDisponiblidad(turno: any): Observable<Turno> {
    return this.http.post<Turno>(`${this.authURL}turnos/disponibilidad`, turno);
  }
}
