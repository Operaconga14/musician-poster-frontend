import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../environments/environments';
import { ApiService } from '../../core-module/services/api.service';
import { AuthService } from '../../core-module/services/auth.service';
import { AppToastService } from '../../core-module/services/app-toast.service';
import { UtilService } from '../../core-module/services/util.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, HttpClientModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  register_form: FormGroup
  isSuccess: any
  isFailed: any
  message: any

  // http configuration
  private apiService = inject(ApiService)
  private authService = inject(AuthService)
  private toastService = inject(AppToastService)
  private utilSercvice = inject(UtilService)
  private router = inject(Router)
  private http = inject(HttpClient)

  constructor() {
    this.register_form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.pattern(this.utilSercvice.EMAIL_REGEX), Validators.required]),
      role: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  register() {
    this.apiService.post('/user/auth/register', this.register_form.value)
      .then(response => {
        this.isSuccess = response.data
        this.message = response.data.message
        // console.log(this.message)
        setTimeout(() => {
          this.isSuccess = null
          this.router.navigate(['auth/login'])
        }, 5000);
      })
      .catch(error => {
        // console.error(error)
        this.isFailed = error
        this.message = error.message
        setTimeout(() => {
          this.isFailed = null
        }, 4000);
      })
  }

}
