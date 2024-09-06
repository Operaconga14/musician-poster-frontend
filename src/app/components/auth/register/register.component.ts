import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../core-module/services/api.service';
import { AppToastService } from '../../core-module/services/app-toast.service';
import { AuthService } from '../../core-module/services/auth.service';
import { ModalService } from '../../core-module/services/modal.service';
import { UtilService } from '../../core-module/services/util.service';
import { BenefitsModalComponent } from '../../modals/benefits-modal/benefits-modal.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, HttpClientModule, ReactiveFormsModule, CommonModule, NgbTooltipModule],
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
  private modalService = inject(ModalService)
  private authService = inject(AuthService)

  constructor() {
    this.register_form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.pattern(this.utilSercvice.EMAIL_REGEX), Validators.required]),
      role: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
    // this.authService.hasLoggedIn()
  }

  register() {
    // register
    this.apiService.post('user/auth/register', this.register_form.value)
      .then(async response => {
        this.toastService.show('Success!', `${response.data.message}`, 5000, 'bg-success text-white')
        setTimeout(() => {
          this.router.navigate(['auth/login'])
        }, 2000);
      })
      .catch(error => {
        console.log("Error: ", error.response.data)
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
