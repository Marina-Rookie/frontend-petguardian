import { HttpClient } from '@angular/common/http';
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

  getInformesCuidadores() {
    return this.http.get(`${this.authURL}informes/cuidadores-con-reservas`);
  }
}
