import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private loggedin = new BehaviorSubject<boolean>(false);
  public token: any;

  private router = inject(Router);

  constructor() {
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }


  setLocalSorage(token: any) {
    localStorage.setItem('token', token);
    this.loggedin.next(true);
  }

  getLocaleStorage() {
    return localStorage.getItem('token');
  }

  signOut() {
    localStorage.removeItem('token');
    this.loggedin.next(false);
  }

  // // has loggedin
  hasLoggedIn(): any {
    this.router.navigate(['me']);
    return this.loggedin.asObservable();
  }

}
