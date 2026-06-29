import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

import { AuthService } from '../services/auth.service';

/**
 * Interceptor HTTP funcional que maneja errores globalmente:
 * - 401: Limpia el estado de auth y redirige al login
 * - 403: Redirige al inicio (sin permisos)
 * - Otros: Propaga el error para que cada componente lo maneje
 */
export const errorInterceptor: HttpInterceptorFn = (request, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Evitamos bucle infinito si la petición que falló es de autenticación básica/sesión/logout
        const isAuthRequest =
          request.url.includes('/auth/profile') ||
          request.url.includes('/auth/login') ||
          request.url.includes('/auth/logout');

        if (!isAuthRequest) {
          authService.clearSession();
        }
      } else if (error.status === 403) {
        // Sin permisos suficientes — redirigir al inicio
        router.navigate(['/']);
      }

      return throwError(() => error);
    })
  );
};
