import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../core-module/services/api.service';
import { AppToastService } from '../../core-module/services/app-toast.service';
import { AuthService } from '../../core-module/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  login_form: FormGroup

  private router = inject(Router)
  private apiService = inject(ApiService)
  private authService = inject(AuthService)
  private toastService = inject(AppToastService)


  constructor() {
    this.login_form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  login() {
    this.apiService.post('user/auth/login', this.login_form.value)
      .then(response => {
        const token = response.data.token;
        this.authService.setLocalSorage(token); // Save token to local storage
        this.toastService.show('Success!', `${response.data.message}`, 5000, 'bg-success text-white')
        setTimeout(() => {
          this.router.navigate(['me']); // Redirect to another route
        }, 4000);
      })
      .catch(error => {
        this.toastService.error('Error!', `${error.response.data.message}`, 5000, 'bg-danger | text-white')
        setTimeout(() => {
          location.reload()
        }, 1000);
      });
  }
}
