import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../core-module/services/api.service';
import { AppToastService } from '../../core-module/services/app-toast.service';
import { UtilService } from '../../core-module/services/util.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, HttpClientModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  register_form: FormGroup


  // http configuration
  private apiService = inject(ApiService)
  private utilSercvice = inject(UtilService)
  private router = inject(Router)
  private toastService = inject(AppToastService)

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
    this.apiService.post('user/auth/register', this.register_form.value)
      .then(response => {
        this.toastService.show('Success!', `${response.data.message}`, 5000, 'bg-success || text-white')
        // console.log(this.message)
        setTimeout(() => {

          this.router.navigate(['auth/login'])
        }, 5000);
      })
      .catch(error => {
        // console.error(error)
        this.toastService.error('Erorr!', `${error.response.data.message}`, 5000, '|| text-white')
        setTimeout(() => {

        }, 4000);
      })
  }

}
