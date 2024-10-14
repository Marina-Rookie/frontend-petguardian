import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment.prod';
import { EtapaVida } from '../models/EtapaVida';

@Injectable({
  providedIn: 'root'
})
export class EtapasVidaService extends ApiService<EtapaVida> {

  authURL = environment.url_server;

  constructor(http: HttpClient) {
    super(http, `${environment.url_server}` + 'etapasVida');
  }

}
