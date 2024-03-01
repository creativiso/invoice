import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Customize the outgoing request here
    // For example, add a custom header
    const modifiedRequest = request.clone({
      setHeaders: {},
      withCredentials: true, // allow to set cookies
    });

    // Pass the modified request to the next handler
    return next.handle(modifiedRequest);
  }
}
