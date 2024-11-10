import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Reserva } from '../models/Reserva';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ReservaService extends ApiService<Reserva>{

  authURL = environment.url_server;

  constructor(http: HttpClient) {
    super(http, `${environment.url_server}` + 'reservas');
  }

  getReservasPorCliente(idCliente: string): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.authURL}reservas/reservasPorCliente/${idCliente}`);
  }

  getReservasPorCuidador(idCuidador: string): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.authURL}reservas/reservasPorCuidador/${idCuidador}`);
  }

  cancelarReserva(idReserva: string): Observable<any> {
    return this.http.put<any>(`${this.authURL}reservas/cancelar/${idReserva}`, {});
  }

  aprobarReserva(idReserva: string): Observable<any> {
    return this.http.put<any>(`${this.authURL}reservas/aprobar/${idReserva}`, {});
  }

  rechazarReserva(idReserva: string): Observable<any> {
    return this.http.put<any>(`${this.authURL}reservas/rechazar/${idReserva}`, {});
  }

  anularReserva(idReserva: string): Observable<any> {
    return this.http.put<any>(`${this.authURL}reservas/anular/${idReserva}`, {});
  }

  getReseniasPorCuidador(idCuidador: string): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.authURL}resenias/reseniasPorUsuario/${idCuidador}`);
  }
}
