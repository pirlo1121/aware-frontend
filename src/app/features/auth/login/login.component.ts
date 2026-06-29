import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from '../../../core/services/auth.service';
import { LoginPayload } from '../../../core/interfaces';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  readonly isLoading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  readonly loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const payload: LoginPayload = this.loginForm.value;

    this.authService.login(payload).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/']);
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading.set(false);
        const message =
          error.error?.error ?? 'Credenciales inválidas. Intenta de nuevo.';
        this.errorMessage.set(message);
      },
    });
  }

  // Helpers para el template
  get emailControl() {
    return this.loginForm.get('email')!;
  }

  get passwordControl() {
    return this.loginForm.get('password')!;
  }
}
