import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { ACCESS_TOKEN_KEY } from '../../../constances';
import { User } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  public token: any

  private apiService = inject(ApiService)
  private cookieService = inject(CookieService)

  constructor() {
    this.currentUserSubject = new BehaviorSubject<User | null>(null)
    this.currentUser = this.currentUserSubject.asObservable()
  }

  // setCookie(token: any) {
  //   this.cookieService.set('token', `${token}`, 3600000, '/', '', true, 'Lax');
  //   setTimeout(() => {
  //     if (this.cookieService.check('token')) {
  //       console.log('Cookie Checked is true');
  //     } else {
  //       console.log('Cookie Checked is false');
  //     }
  //   }, 100); // Delay by 100ms
  // }

  // getCookie() {

  // }

  setLocalSorage(token: any) {
    localStorage.setItem('token', token)
  }

  getLocaleStorage() {
    return localStorage.getItem('token')
  }

  // setSessionStorage(token: any) {
  //   return sessionStorage.setItem('token', token)
  // }

  // getSessionStorage() {
  //   return sessionStorage.getItem('token')
  // }

  signOut() {
    return localStorage.removeItem('token')
  }

}
