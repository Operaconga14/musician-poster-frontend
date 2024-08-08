import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { ACCESS_TOKEN_KEY } from '../../../constances';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState = new BehaviorSubject<boolean>(false)
  token: any;
  user: any

  private router = inject(Router)
  private apiService = inject(ApiService)
  private userService = inject(UserService)

  constructor() {
    this.token = localStorage.getItem(ACCESS_TOKEN_KEY)
    this.authState.next(!!this.token)
  }

  set(token: any) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token)
    this.authState.next(true)
    this.token = token
  }

  // // get user info
  getAccessInfo() {
    this.user = localStorage.getItem('user')
    this.authState.next(!!this.user)
    return this.user
  }

  // // has loggedin
  hasLoggedIn(): any {
    this.router.navigate(['me'])
    return this.authState.getValue()
  }

  signOut() {

  }
}
