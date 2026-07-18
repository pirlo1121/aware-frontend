# Estructura del proyecto — DashboardMirror

Panel de administración (admin, login, crear/editar posts, borradores, suscriptores).
Las páginas públicas (posts publicados, about, suscripción) viven en el proyecto `landing`.

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
│   │   ├── subscriber.interface.ts   # Subscriber
│   │   ├── upload.interface.ts       # UploadResponse
│   │   └── index.ts                  # Barrel export
│   └── services/
│       ├── auth.service.ts           # Login, register, logout, profile, session restore
│       ├── post.service.ts           # CRUD de posts + multipart/form-data
│       ├── subscriber.service.ts     # Administración de suscriptores (listar, pausar, activar, borrar)
│       └── upload.service.ts         # Subida de imágenes a S3
│
├── features/
│   ├── auth/
│   │   ├── login/                    # Ruta: /login (guestGuard)
│   │   └── register/                 # Ruta: /register (guestGuard)
│   ├── posts/
│   │   ├── post-form/                # Ruta: /posts/new y /posts/:slug/edit (adminGuard)
│   │   └── post-drafts/              # Ruta: /drafts (adminGuard)
│   ├── admin/
│   │   └── subscriber-list/          # Ruta: /admin/subscribers (adminGuard)
│   └── profile/
│       └── profile.component.ts      # Ruta: /profile (adminGuard)
│
└── shared/
    ├── navbar/                       # Componente de navegación reactivo
    └── not-found/                    # Ruta: ** (wildcard 404)
```

## Rutas

| Ruta | Componente | Guard |
|------|-----------|-------|
| `/` | Redirige a `/login` | — |
| `/login` | LoginComponent | guestGuard |
| `/register` | RegisterComponent | guestGuard |
| `/posts/new` | PostFormComponent | adminGuard |
| `/posts/:slug/edit` | PostFormComponent | adminGuard |
| `/drafts` | PostDraftsComponent | adminGuard |
| `/profile` | ProfileComponent | adminGuard |
| `/admin/subscribers` | SubscriberListComponent | adminGuard |
| `/**` | NotFoundComponent | — |

## Autenticación

- Cookies HTTP-only: el servidor las gestiona automáticamente
- `withCredentials: true` en todas las peticiones privadas
- `restoreSession()` se llama en `App.ngOnInit()` para restaurar sesión al recargar
- `AuthService` usa **Angular Signals** para estado reactivo
