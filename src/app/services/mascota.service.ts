import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment.prod';
import { Mascota } from '../models/Mascota';

@Injectable({
  providedIn: 'root'
})
export class MascotaService extends ApiService<Mascota>{

  authURL = environment.url_server;

  constructor(http: HttpClient) {
    super(http, `${environment.url_server}` + 'mascotas');
  }

  getMascotasPorCliente(idCliente: string): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`${this.authURL}mascotas/mascotasPorUsuario/${idCliente}`);
  }

  postImagenMascota(idMascota: string, formData: FormData): Observable<any> {
    return this.http.post(`${this.authURL}mascotas/upload/${idMascota}`, formData);
  }
}
