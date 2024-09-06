import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {

  constructor() { }

  private initializeAnalytics() {
    if (typeof gtag !== 'undefined') {
      gtag('js', new Date());
      gtag('config', 'G-FYKEV9J871');
    }
  }

  public trackPageView(url: string) {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'page_view', {
        page_path: url
      });
    }
  }

  public eventEmitter(eventName: string,
    eventCategory: string,
    eventAction: string,
    eventLabel?: string,
    eventValue?: number) {
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, {
        eventCategory: eventCategory,
        eventLabel: eventLabel,
        eventAction: eventAction,
        eventValue: eventValue,
      })
    }
  }
}
