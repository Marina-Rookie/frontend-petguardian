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
}
