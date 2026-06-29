import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, catchError, of } from 'rxjs';

import { AuthService } from '../services/auth.service';

export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.sessionChecked()) {
    return authService.restoreSession().pipe(
      map(() => {
        if (!authService.isLoggedIn()) return true;
        return router.createUrlTree(['/']);
      }),
      catchError(() => of(true)),
    );
  }

  if (!authService.isLoggedIn()) {
    return true;
  }

  return router.createUrlTree(['/']);
};
