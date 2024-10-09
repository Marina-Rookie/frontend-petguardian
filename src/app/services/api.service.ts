import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  authURL = environment.url_server;

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token') || '',
    }),
  };

  public get(url: string) {
    console.log(localStorage.getItem('token'));
    return this.http.get(this.authURL + url, this.httpOptions);
  }

  public getParam(url: string, params: string, datos: object) {
    const param = new HttpParams().set(params, JSON.stringify(datos));
    return this.http.get(url, {
      ...this.httpOptions,
      params: param,
    });
  }

  post(objeto: any, url: string, options?: any) {
    return options
      ? this.http.post(this.authURL + url, objeto, { ...this.httpOptions, ...options })
      : this.http.post(this.authURL + url, objeto, this.httpOptions);
  }

  put(objeto: object, url: string) {
    return this.http.put(this.authURL + url, objeto, this.httpOptions);
  }

  delete(url: string, body?: any) {
    return body
      ? this.http.delete(this.authURL + url, { ...this.httpOptions, body })
      : this.http.delete(this.authURL + url, this.httpOptions);
  }
}
