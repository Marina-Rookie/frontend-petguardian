import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment.prod';
import { EtapaVida } from '../models/EtapaVida';

@Injectable({
  providedIn: 'root'
})
export class DisponibilidadService extends ApiService<any> {

  authURL = environment.url_server;

  constructor(http: HttpClient) {
    super(http, `${environment.url_server}` + 'disponibilidadCuidador');
  }

  postTurnos(entity: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/update`, entity);
  }

}
