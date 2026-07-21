import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, catchError, of } from 'rxjs';

import { AuthService } from '../services/auth.service';

/**
 * Guard que protege rutas que requieren autenticación (sin requerir rol admin).
 * Espera a que se resuelva restoreSession() antes de decidir, para evitar
 * expulsar al usuario durante una recarga completa mientras la cookie aún
 * no ha sido validada.
 */
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.sessionChecked()) {
    return authService.restoreSession().pipe(
      map(() => (authService.isLoggedIn() ? true : router.createUrlTree(['/login']))),
      catchError(() => of(router.createUrlTree(['/login']))),
    );
  }

  if (authService.isLoggedIn()) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
