import { Routes } from '@angular/router';

import { adminGuard } from './core/guards/admin.guard';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
  // ─── Raíz: redirige al login ────────────────────────────────────────────────
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  // ─── Autenticación (solo para usuarios no autenticados) ────────────────────
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./features/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'register',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./features/auth/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },

  // ─── Posts (gestión, solo admin) ────────────────────────────────────────────
  {
    path: 'posts',
    canActivate: [adminGuard],
    children: [
      {
        path: 'new',
        loadComponent: () =>
          import('./features/posts/post-form/post-form.component').then(
            (m) => m.PostFormComponent
          ),
      },
      {
        path: ':slug/edit',
        loadComponent: () =>
          import('./features/posts/post-form/post-form.component').then(
            (m) => m.PostFormComponent
          ),
      },
    ],
  },

  // ─── Borradores (usuario autenticado) ──────────────────────────────────────
  {
    path: 'drafts',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./features/posts/post-drafts/post-drafts.component').then(
        (m) => m.PostDraftsComponent
      ),
  },

  // ─── Perfil (usuario autenticado) ──────────────────────────────────────────
  {
    path: 'profile',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./features/profile/profile.component').then(
        (m) => m.ProfileComponent
      ),
  },

  // ─── Panel de administración ───────────────────────────────────────────────
  {
    path: 'admin',
    canActivate: [adminGuard],
    children: [
      {
        path: '',
        redirectTo: 'subscribers',
        pathMatch: 'full',
      },
      {
        path: 'subscribers',
        loadComponent: () =>
          import(
            './features/admin/subscriber-list/subscriber-list.component'
          ).then((m) => m.SubscriberListComponent),
      },
    ],
  },

  // ─── Ruta comodín ──────────────────────────────────────────────────────────
  {
    path: '**',
    loadComponent: () =>
      import('./shared/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];
