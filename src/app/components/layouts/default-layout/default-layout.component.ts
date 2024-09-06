import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { GoogleAnalyticsService } from '../../core-module/services/google-analytics.service';
import { ThemeService } from '../../core-module/services/theme.service';
import { ToastsComponent } from "../../core-module/toasts/toasts.component";
import { BackToTopComponent } from "../back-to-top/back-to-top.component";
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, RouterModule, ToastsComponent, BackToTopComponent],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss'
})
export class DefaultLayoutComponent implements OnInit {

  private themeService = inject(ThemeService)
  private googleAlnlyService = inject(GoogleAnalyticsService)
  private router = inject(Router)

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.themeService.setInitialTheme()
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.googleAlnlyService.trackPageView(event.urlAfterRedirects)
      }
    })
  }

}
