import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { Resenia } from '../models/Resenia';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ReseniaService extends ApiService<Resenia>{

  authURL = environment.url_server;

  constructor(http: HttpClient) {
    super(http, `${environment.url_server}` + 'resenias');
  }

  getReseniasPorCuidador(idCuidador: string): Observable<Resenia[]> {
    return this.http.get<Resenia[]>(`${this.authURL}resenias/reseniasPorUsuario/${idCuidador}`);
  }
}
