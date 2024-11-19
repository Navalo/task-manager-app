import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authData = localStorage.getItem('authData');

    if (authData) {
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Basic ${authData}`
        }
      });

      return next.handle(clonedRequest);
    }

    return next.handle(req);
  }
}
