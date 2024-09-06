import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../core-module/services/api.service';
import { AppToastService } from '../../core-module/services/app-toast.service';
import { AuthService } from '../../core-module/services/auth.service';
import { ModalService } from '../../core-module/services/modal.service';
import { BenefitsModalComponent } from '../../modals/benefits-modal/benefits-modal.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, HttpClientModule, NgbTooltipModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  login_form: FormGroup

  private router = inject(Router)
  private apiService = inject(ApiService)
  private authService = inject(AuthService)
  private toastService = inject(AppToastService)
  private modalService = inject(ModalService)


  constructor() {
    this.login_form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })

    // this.authService.hasLoggedIn()
  }

  login() {
    this.apiService.post('user/auth/login', this.login_form.value)
      .then(async response => {
        this.toastService.show('Success!', `${response.data.message}`, 5000, 'bg-success text-white')
        const token = response.data.token;
        this.authService.setLocalSorage(token); // Save token to local storage
        setTimeout(() => {
          this.router.navigate(['me'])
        }, 2000);
      })
      .catch(error => {
        if (error.response.data) {
          this.toastService.error('Error!', `${error.response.data.message}`, 5000, 'bg-danger text-white')
        }

        if (Array.isArray(error.response.data.error.errors)) {
          error.response.data.error.errors.forEach((err: any) => {
            this.toastService.error('Error!', `${err.message || err}`, 5000, 'bg-danger text-white')
          });
        }
      })
  }

  openBenifitModal() {
    this.modalService.openModal(BenefitsModalComponent)
  }
}
