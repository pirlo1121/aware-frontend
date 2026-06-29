import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

/**
 * Guard que evita que usuarios ya autenticados accedan
 * a las páginas de login o registro.
 * Si el usuario está autenticado, lo redirige al inicio.
 */
export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    return true;
  }

  return router.createUrlTree(['/']);
};
