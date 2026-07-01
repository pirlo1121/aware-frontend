import { HttpInterceptorFn } from '@angular/common/http';

const getCsrfToken = (): string | null => {
  const match = document.cookie.match(/(?:^|;\s*)csrf-token=([^;]*)/);
  return match ? match[1] : null;
};

export const csrfInterceptor: HttpInterceptorFn = (request, next) => {
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method)) {
    const token = getCsrfToken();
    if (token) {
      const cloned = request.clone({
        setHeaders: { 'x-csrf-token': token },
      });
      return next(cloned);
    }
  }

  return next(request);
};
