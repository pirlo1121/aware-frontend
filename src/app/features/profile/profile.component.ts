import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { AuthService } from '../../core/services/auth.service';
import { UserProfile } from '../../core/interfaces';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  private readonly authService = inject(AuthService);

  readonly profile = signal<UserProfile | null>(null);
  readonly isLoading = signal(true);
  readonly errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: (response) => {
        this.profile.set(response.data);
        this.isLoading.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage.set('No se pudo cargar el perfil.');
        this.isLoading.set(false);
      },
    });
  }
}
