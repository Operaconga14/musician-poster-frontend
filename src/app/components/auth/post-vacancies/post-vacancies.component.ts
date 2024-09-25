import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../core-module/services/api.service';
import { AppToastService } from '../../core-module/services/app-toast.service';
import { AuthService } from '../../core-module/services/auth.service';
import { ModalService } from '../../core-module/services/modal.service';

@Component({
  selector: 'app-post-vacancies',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './post-vacancies.component.html',
  styleUrl: './post-vacancies.component.scss'
})
export class PostVacanciesComponent {
  vacancyForm: FormGroup;

  public modalService = inject(ModalService);
  private apiService = inject(ApiService);
  private toastService = inject(AppToastService);
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    this.vacancyForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      contact: new FormControl('', [Validators.required]),
      date: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    console.log('Vacancy Infromation', this.vacancyForm.value);
    const token = this.authService.getLocaleStorage();
    if (!token) {
      this.toastService.error('Error!', `Login first`, 5000, 'bg-danger text-white');
      this.router.navigate(['auth/login']);
    }
    this.apiService.post('vacancy/create', this.vacancyForm.value)
      .then(async response => {
        this.modalService.closeModal();
        this.toastService.show('Success!', `${response.data.message}`, 5000, 'bg-success text-white');
        setTimeout(() => {
          location.reload();
        }, 3000);
      })
      .catch(error => {
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

// title: title,
// description: description,
// date: date,
// type: type,
// contact: contact,
