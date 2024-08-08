import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError, throwError } from 'rxjs';

export const AuthInterceptorService: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService)

  request = request.clone({
    // setHeaders: {
    //   'authorization': `Bearer ${authService.token || ''}`,
    //   // 'client-time': new Date().toISOString()
    // }
  })

  return next(request)
    // .pipe(catchError((error: any) => {
    //   if (error instanceof HttpErrorResponse) {
    //     if (error.status == 401) {
    //       authService.signOut()
    //     }
    //   }

    //   return throwError(error)
    // }))
}
