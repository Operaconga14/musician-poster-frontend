import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const AuthInterceptorService: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService);

  request = request.clone({
    // setHeaders: {
    //   'authorization': `Bearer ${authService.token || ''}`,
    //   // 'client-time': new Date().toISOString()
    // }
  });

  return next(request);
  // .pipe(catchError((error: any) => {
  //   if (error instanceof HttpErrorResponse) {
  //     if (error.status == 401) {
  //       authService.signOut()
  //     }
  //   }

  //   return throwError(error)
  // }))
};
