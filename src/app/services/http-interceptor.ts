import { HttpRequest, HttpEvent, HttpResponse, HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {

    const token: string = localStorage.getItem('token') || '';
    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: `${token}`
        }
      });
    }

    return next(request).pipe(map(response => {
      if (response instanceof HttpResponse) {
        if (response.status === 401) { //Agregar metodos de logout
        }
      }

      return response;
    }));
};
