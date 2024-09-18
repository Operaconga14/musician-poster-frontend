import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../core-module/services/api.service';
import { AppToastService } from '../../core-module/services/app-toast.service';
import { AuthService } from '../../core-module/services/auth.service';
import { ModalService } from '../../core-module/services/modal.service';

@Component({
  selector: 'app-post-gigs',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './post-gigs.component.html',
  styleUrl: './post-gigs.component.scss'
})
export class PostGigsComponent {

  gigForm: FormGroup;

  public modalService = inject(ModalService);
  private apiService = inject(ApiService);
  private toastService = inject(AppToastService);
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    this.gigForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      contact: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      date: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    console.log('Gig Infromation', this.gigForm.value);
    const token = this.authService.getLocaleStorage();
    if (!token) {
      this.toastService.error('Error!', `Login first`, 5000, 'bg-danger text-white');
      this.modalService.closeModal();
      this.router.navigate(['auth/login']);
    }
    this.apiService.post('gig/create', this.gigForm.value)
      .then(async response => {
        this.modalService.closeModal();
        this.toastService.show('Success!', `${response.data.message}`, 5000, 'bg-success text-white');
        setTimeout(() => {
          location.reload();
        }, 3000);
      })
      .catch(error => {
        console.log("Error: ", error.response.data);
        if (error.response.data) {
          this.modalService.closeModal();
          this.toastService.error('Error!', `${error.response.data.message}`, 5000, 'bg-danger text-white');
        }

        if (Array.isArray(error.response.data.error.errors)) {
          error.response.data.error.errors.forEach((err: any) => {
            this.modalService.closeModal();
            this.toastService.error('Error!', `${err.message || err}`, 5000, 'bg-danger text-white');
          });
        }
      });
  }

}
