import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { environment } from '../../../environments/environments';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../core-module/services/api.service';
import { AuthService } from '../../core-module/services/auth.service';

interface LoginResponse {
  messag: string,
  token: string
}

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
    this.apiService.post('auth/login', this.login_form.value)
      .then(response => {
        const token = response.data.token;
        this.authService.setSessionStorage(token); // Save token to local storage
        console.log(token)
        console.log('Login successful');
        this.router.navigate(['me']); // Redirect to another route
      })
      .catch(error => {
        console.error('Login error', error);
      });
  }
}
