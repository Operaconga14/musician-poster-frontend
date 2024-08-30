import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private isDarkTheme = new BehaviorSubject<boolean>(false); // Default to light theme
  currentTheme = this.isDarkTheme.asObservable();

  toggleTheme() {
    this.isDarkTheme.next(!this.isDarkTheme.value);
    const theme = this.isDarkTheme.value ? 'dark-theme' : 'light-theme';
    document.body.className = theme; // Apply theme to body for global styles

    // Optional: Persist the selected theme in localStorage
    localStorage.setItem('theme', theme);
  }

  setInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.body.className = savedTheme;
      this.isDarkTheme.next(savedTheme === 'dark-theme');
    }
  }
}
