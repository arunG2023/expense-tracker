import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { routesConfig } from '../config/routes-config';

@Injectable()
export class ApiErrorInterceptor implements HttpInterceptor {

  constructor(private _router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error:any) => {
        if(error instanceof HttpErrorResponse){
          if(error.status == 403){
            localStorage.removeItem('Token');
            this._router.navigate([routesConfig.ERROR_PAGE], {
              queryParams: { code: 403 }
            });
          }
          else if(error.status == 404){
            this._router.navigate([routesConfig.ERROR_PAGE], {
              queryParams: { code: 404 }
            });
          }
          else if(error.status == 500 || error.status == 0 || error.status == 400){
            this._router.navigate([routesConfig.ERROR_PAGE], {
              queryParams: { code: 500 }
            });
          }
        }
        return next.handle(request);
      })
    )
    
  }
}
