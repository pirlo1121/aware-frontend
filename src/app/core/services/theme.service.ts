import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  readonly isDarkMode = signal(false);

  constructor() {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      this.setDarkMode(true);
    } else if (saved === 'light') {
      this.setDarkMode(false);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setDarkMode(prefersDark);
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.setDarkMode(e.matches);
      }
    });
  }

  toggle(): void {
    this.setDarkMode(!this.isDarkMode());
  }

  private setDarkMode(value: boolean): void {
    this.isDarkMode.set(value);
    document.documentElement.classList.toggle('dark-mode', value);
    localStorage.setItem('theme', value ? 'dark' : 'light');
  }
}
