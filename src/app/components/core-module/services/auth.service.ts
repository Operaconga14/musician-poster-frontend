import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { ACCESS_TOKEN_KEY } from '../../../constances';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  public authToken: any

  private apiService = inject(ApiService)

  constructor() {
    this.currentUserSubject = new BehaviorSubject<User | null>(null)
    this.currentUser = this.currentUserSubject.asObservable()
  }


  // get token from cookie
  private getTokenFromCookie(): string | null {
    const match = document.cookie.match(new RegExp('(^| )token=([^;]+)'))
    return match ? match[2] : null
  }


  // get the current user
  private async getCurrentUser(): Promise<User | null> {
    const token = this.getTokenFromCookie()
    if (!token) {
      return null
    }

    try {
      const response = await this.apiService.get('auth/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data

    } catch (error) {
      console.error('Error fetching the current user:', error);
      return null;
    }
  }

  // refresh current user
  public async refreshCurrentUser(): Promise<void> {
    const user = await this.getCurrentUser()
    this.currentUserSubject.next(user)
  }

  setCookie(name: string, value: string, days: number) {
    const expires = new Date()
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000))
    const expiresString = "expires" + expires.toUTCString()
    document.cookie = `${name}=${value}; ${expiresString}; path=/`
  }

  getCookie(name: string): string | null {
    const nameEQ = name + "="
    const ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while(c.charAt(0) === ' ') c = c.substring(1);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null
  }
}
