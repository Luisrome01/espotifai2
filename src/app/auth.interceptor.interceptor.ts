/*import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem('authToken');
    
    let clonedRequest = req;

    if (authToken) {
      clonedRequest = req.clone({
        setHeaders: { 
          Authorization: `Bearer ${authToken}`
        }
      });
    }
    
    return next.handle(clonedRequest);
  }
}
*/