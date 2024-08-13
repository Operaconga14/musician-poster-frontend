import { Component, inject, OnInit } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../core-module/services/auth.service';
import { User } from "../../core-module/models/user.model";
import { ApiService } from '../../core-module/services/api.service';
import { Router } from '@angular/router';
import axios from 'axios';

axios.defaults.withCredentials = true
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user_details: any
  currentUser: User | any = null

  private authService = inject(AuthService)
  private apiService = inject(ApiService)
  private router = inject(Router)

  ngOnInit(): void {
    this.loadUserDetails()
  }

  loadUserDetails() {
    const token = this.authService.getLocaleStorage()
    if (token) {
      this.apiService.get('user/me')
        .then(async res => {
          this.user_details = res.data.user
        })
        .catch(error => {
          console.error('Error fetching user details:', error);
        })
    }
  }

  logOut() {
    this.authService.signOut()
    this.router.navigate(['auth/login'])
  }

}
