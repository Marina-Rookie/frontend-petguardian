import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment.prod';
import { TipoMascota } from '../models/TipoMascota';

@Injectable({
  providedIn: 'root'
})
export class TiposMascotaService extends ApiService<TipoMascota> {

  authURL = environment.url_server;

  constructor(http: HttpClient) {
    super(http, `${environment.url_server}` + 'tiposMascota');
  }

}
