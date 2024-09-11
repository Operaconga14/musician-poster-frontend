import { Injectable } from '@angular/core';

export interface ToastInfo {
  header: string;
  body: string;
  delay?: number;
  cssClasses?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppToastService {

  toasts: ToastInfo[] = [];

  constructor() { }

  show(header: string, body: string, delay?: number, cssClasses?: string) {
    this.toasts.push({ header, body, delay, cssClasses });
  }

  error(header: string, body: string, delay: number = 5000, cssClasses: string | undefined = undefined) {
    this.toasts.push({ header, body, delay, cssClasses: 'bg-danger text-light' + (cssClasses ?? '') });
  }

  hide(toast: ToastInfo) {
    this.toasts = this.toasts.filter(t => t != toast);
  }
}
