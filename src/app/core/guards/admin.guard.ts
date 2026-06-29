import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

/**
 * Guard que protege rutas exclusivas de administradores.
 * Si el usuario no es admin, lo redirige al inicio.
 */
export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAdmin()) {
    return true;
  }

  // Si está autenticado pero no es admin, redirigir al inicio
  if (authService.isLoggedIn()) {
    return router.createUrlTree(['/']);
  }

  // Si no está autenticado, redirigir al login
  return router.createUrlTree(['/login']);
};
