import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends ApiService<any> {

  authURL = environment.url_server;

  constructor(http: HttpClient) {
    super(http, `${environment.url_server}` + 'usuarios');
  }

  login(loginData: any): Observable<any> {
    return this.http.post<any>(`${this.authURL}usuarios/login`, loginData);
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.authURL}logout`, {});
  }
}
