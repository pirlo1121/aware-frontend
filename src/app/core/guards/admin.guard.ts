import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, catchError, of } from 'rxjs';

import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.sessionChecked()) {
    return authService.restoreSession().pipe(
      map(() => {
        if (authService.isAdmin()) return true;
        if (authService.isLoggedIn()) return router.createUrlTree(['/']);
        return router.createUrlTree(['/login']);
      }),
      catchError(() => of(router.createUrlTree(['/login']))),
    );
  }

  if (authService.isAdmin()) {
    return true;
  }

  if (authService.isLoggedIn()) {
    return router.createUrlTree(['/']);
  }

  return router.createUrlTree(['/login']);
};
