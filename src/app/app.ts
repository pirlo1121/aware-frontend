import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AuthService } from './core/services/auth.service';
import { NavbarComponent } from './shared/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <app-navbar />
    <main>
      <router-outlet />
    </main>
  `,
})
export class App implements OnInit {
  private readonly authService = inject(AuthService);

  ngOnInit(): void {
    /**
     * Al iniciar la app, intentamos restaurar la sesión del usuario
     * leyendo la cookie HTTP-only que el servidor haya establecido previamente.
     * Si no hay sesión activa, el error es silenciado (es el comportamiento esperado).
     */
    this.authService.restoreSession().subscribe({
      error: () => {
        // Sin sesión activa — el usuario no está autenticado
      },
    });
  }
}
