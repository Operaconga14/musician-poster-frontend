import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeToggleButtonComponent } from "../theme-toggle-button/theme-toggle-button.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, ThemeToggleButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  title = 'MUGIVIES'

  public nav_detail?: any
  active: any | undefined;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.showNavDetails()
  }

  showNavDetails() {
    this.nav_detail = [
      { name: 'Home', url: '/' },
      { name: 'Gigs', url: 'gigs' },
      { name: 'Vacancies', url: 'vacancies' },
      { name: 'Market Place', url: 'market-place' },
      { name: 'Services', url: 'services' },
      { name: 'Blog', url: 'blogs' },
      { name: 'Events', url: 'events' },
      { name: 'Contibutors', url: 'contributors' },
      { name: 'My Dashboard', url: 'me' },
      { name: 'Login', url: `auth/login` },
      { name: 'SignUp', url: 'auth/register' },
      // { name: 'Privacy Policy', url: 'policy' },
    ]
  }
}
