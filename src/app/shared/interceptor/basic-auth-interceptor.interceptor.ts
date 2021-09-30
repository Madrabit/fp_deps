import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import compileStreaming = WebAssembly.compileStreaming;

@Injectable()
export class BasicAuthInterceptorInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // @ts-ignore
    let currentUser = JSON.parse(<string>localStorage.getItem('currentUser'));
    if (currentUser) {
      let encryptedUser = btoa(`${currentUser.name}:${currentUser.password}`);
      request = request.clone({
        setHeaders: {
          Authorization: `Basic ${encryptedUser}`
        }
      });
    }

    return next.handle(request);
  }
}
