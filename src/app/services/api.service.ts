import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService<T> {

  constructor(protected http: HttpClient, @Inject('BASE_API_URL') protected baseUrl: string) {}

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl).pipe(catchError(this.handleError));
  }

  getById(id: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${id}`).pipe(catchError(this.handleError));
  }

  post(entity: T): Observable<T> {
    return this.http.post<T>(this.baseUrl, entity).pipe(catchError(this.handleError));
  }

  put(entity: T, id: string): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${id}`, entity).pipe(catchError(this.handleError));
  }

  delete(id: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${id}`).pipe(catchError(this.handleError));
  }

  protected handleError(error: any): Observable<never> {
    console.error(error);
    return new Observable<never>();
  }
}
