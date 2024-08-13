import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { environment } from '../../../environments/environments';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../core-module/services/api.service';
import { AuthService } from '../../core-module/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  api_url = environment.api_url
  login_form: FormGroup
  isSuccess: any
  isFailed: any
  message: any

  private router = inject(Router)
  private apiService = inject(ApiService)
  private authService = inject(AuthService)


  constructor() {
    this.login_form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  login() {
    this.apiService.post('/user/auth/login', this.login_form.value)
      .then(response => {
        const token = response.data.token;
        this.authService.setLocalSorage(token); // Save token to local storage
        console.log(token)
        console.log('Login successful');
        this.isSuccess = response.data
        this.message = response.data.message
        setTimeout(() => {
          this.isSuccess = null
          this.router.navigate(['me']); // Redirect to another route
        }, 5000);
      })
      .catch(error => {
        console.error('Login error', error);
        this.isFailed = error
        this.message = error.message
        setTimeout(() => {
          this.isFailed = null
        }, 4000);
      });
  }
}
