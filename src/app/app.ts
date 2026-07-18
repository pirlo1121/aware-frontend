import { ChangeDetectionStrategy, Component, OnInit, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';

import { AuthService } from './core/services/auth.service';
import { ThemeService } from './core/services/theme.service';
import { NavbarComponent } from './shared/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-navbar />
    <main>
      <router-outlet />
    </main>
    <footer>
      <div class="footer-bottom">
        <p>© 2026 MindMirror. Panel de administración.</p>
      </div>
    </footer>
  `,
})
export class App implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly themeService = inject(ThemeService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    /**
     * Al iniciar la app, intentamos restaurar la sesión del usuario
     * leyendo la cookie HTTP-only que el servidor haya establecido previamente.
     * Si no hay sesión activa, el error es silenciado (es el comportamiento esperado).
     */
    this.authService.restoreSession().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      error: () => {
        // Sin sesión activa — el usuario no está autenticado
      },
    });
  }
}
