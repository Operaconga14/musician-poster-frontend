import { Component, inject, OnInit } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../core-module/services/auth.service';
import { User } from "../../core-module/models/user.model";
import { ApiService } from '../../core-module/services/api.service';
import { Router } from '@angular/router';

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
  api_url = environment.api_url

  private authService = inject(AuthService)
  private apiService = inject(ApiService)
  private router = inject(Router)

  ngOnInit(): void {
    this.loadUserDetails()
  }

  loadUserDetails() {
    const token = this.authService.getSessionStorage()
    if (token) {
      this.apiService.get('auth/me', token)
        .then(response => {
          this.user_details = response.data
          console.log('User Details', this.user_details)
          console.log('name: ', this.user_details.message.user.name)
        })
    }
  }

  logOut() {
    this.authService.signOut()
    this.router.navigate(['auth/login'])
  }

}
