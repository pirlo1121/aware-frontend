# Estructura del proyecto — Aware Front

```
src/app/
├── core/
│   ├── constants/
│   │   └── api.constants.ts          # URLs y endpoints centralizados
│   ├── guards/
│   │   ├── auth.guard.ts             # Requiere autenticación
│   │   ├── admin.guard.ts            # Requiere rol admin
│   │   └── guest.guard.ts            # Solo para usuarios no autenticados
│   ├── interceptors/
│   │   └── error.interceptor.ts      # Manejo global de errores 401/403
│   ├── interfaces/
│   │   ├── api.interface.ts          # ApiResponse, ApiListResponse, ApiError
│   │   ├── user.interface.ts         # AuthUser, UserProfile, LoginPayload, RegisterPayload
│   │   ├── post.interface.ts         # Post, PostSummary, ContentBlock, CreatePostPayload, UpdatePostPayload
│   │   ├── subscriber.interface.ts   # Subscriber, CreateSubscriberPayload
│   │   ├── upload.interface.ts       # UploadResponse
│   │   └── index.ts                  # Barrel export
│   └── services/
│       ├── auth.service.ts           # Login, register, logout, profile, session restore
│       ├── post.service.ts           # CRUD de posts + multipart/form-data
│       ├── subscriber.service.ts     # Suscripción y administración
│       └── upload.service.ts         # Subida de imágenes a S3
│
├── features/
│   ├── auth/
│   │   ├── login/                    # Ruta: /login (guestGuard)
│   │   └── register/                 # Ruta: /register (guestGuard)
│   ├── posts/
│   │   ├── post-list/               # Ruta: /posts (pública)
│   │   ├── post-detail/             # Ruta: /posts/:slug (pública)
│   │   ├── post-form/               # Ruta: /posts/new y /posts/:id/edit (authGuard)
│   │   └── post-drafts/             # Ruta: /drafts (authGuard)
│   ├── admin/
│   │   └── subscriber-list/         # Ruta: /admin/subscribers (adminGuard)
│   ├── subscribers/
│   │   └── subscribe/               # Ruta: /subscribe (pública)
│   └── profile/
│       └── profile.component.ts     # Ruta: /profile (authGuard)
│
└── shared/
    ├── navbar/                       # Componente de navegación reactivo
    └── not-found/                    # Ruta: ** (wildcard 404)
```

## Rutas

| Ruta | Componente | Guard |
|------|-----------|-------|
| `/` | Redirige a `/posts` | — |
| `/login` | LoginComponent | guestGuard |
| `/register` | RegisterComponent | guestGuard |
| `/posts` | PostListComponent | — |
| `/posts/new` | PostFormComponent | authGuard |
| `/posts/:id/edit` | PostFormComponent | authGuard |
| `/posts/:slug` | PostDetailComponent | — |
| `/drafts` | PostDraftsComponent | authGuard |
| `/profile` | ProfileComponent | authGuard |
| `/subscribe` | SubscribeComponent | — |
| `/admin/subscribers` | SubscriberListComponent | adminGuard |
| `/**` | NotFoundComponent | — |

## Autenticación

- Cookies HTTP-only: el servidor las gestiona automáticamente
- `withCredentials: true` en todas las peticiones privadas
- `restoreSession()` se llama en `App.ngOnInit()` para restaurar sesión al recargar
- `AuthService` usa **Angular Signals** para estado reactivo
