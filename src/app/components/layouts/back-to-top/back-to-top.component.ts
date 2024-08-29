import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-back-to-top',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './back-to-top.component.html',
  styleUrl: './back-to-top.component.scss'
})
export class BackToTopComponent {

  showButton: boolean = false;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    // Show the button when scrolled down 200px
    this.showButton = window.scrollY > 2000;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
