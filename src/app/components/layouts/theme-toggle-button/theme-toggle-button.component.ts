import { Component } from '@angular/core';

@Component({
  selector: 'app-theme-toggle-button',
  standalone: true,
  imports: [],
  templateUrl: './theme-toggle-button.component.html',
  styleUrl: './theme-toggle-button.component.scss'
})
export class ThemeToggleButtonComponent {
  isDarkTheme = false

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme
    const theme = this.isDarkTheme ? 'dark-theme' : 'light-theme'
    document.body.className = theme
  }
}
