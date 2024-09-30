import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

export const AuthInterceptorService: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService);

  const token = localStorage.getItem('token')

  request = request.clone({
    setHeaders: {
      'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
    withCredentials: true
  });

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      return throwError(() => new Error(error.message))
    })
  )
};
