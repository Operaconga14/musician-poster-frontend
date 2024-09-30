import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../core-module/services/api.service';
import { AppToastService } from '../../core-module/services/app-toast.service';
import { AuthService } from '../../core-module/services/auth.service';
import { CountryService } from '../../core-module/services/country.service';
import { StateService } from '../../core-module/services/state.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent {
  selectedFile: File | null = null;

  locations: any;
  updateForm: FormGroup;
  userPicture: any;
  countryist: string[]= [];

  private locationService = inject(StateService);
  private apiService = inject(ApiService);
  private toastService = inject(AppToastService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private countryService = inject(CountryService);

  constructor() {
    // +2348140153436
    this.updateForm = new FormGroup({
      contact: new FormControl('', [Validators.min(11), Validators.max(14)]),
      bio: new FormControl(''),
      location: new FormControl(''),
      genre: new FormControl(''),
      awards: new FormControl(''),
      facebook: new FormControl(''),
      audiomack: new FormControl(''),
      applemusic: new FormControl(''),
      boomplay: new FormControl(''),
      instagram: new FormControl(''),
      spotify: new FormControl(''),
      youtube: new FormControl(''),
      twitter: new FormControl(''),
      tiktok: new FormControl(''),
      // linkedin: new FormControl(''),
    });
  }

  onfileSelect(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0]; // Get the selected file
    }
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.locations = this.locationService.location;
    this.loadUserPicture();
    this.countryService.getCountries().subscribe((countries) => {
      this.countryist = countries.map(country => country.name.common)
      .sort((a, b) => a.localeCompare(b));
    });

  }

  loadUserPicture() {
    const token = this.authService.getLocaleStorage();
    if (!token) {
      this.toastService.error('Error!', `Login first`, 5000, 'bg-danger text-white');
      this.router.navigate(['auth/login']);
    }

    this.apiService.get('user/me')
      .then(response => {
        this.userPicture = response.data.user.picture;
      })
      .catch(error => {
        if (error.response.data) {
          this.toastService.error('Error!', `${error.response.data.message}`, 5000, 'bg-danger text-white');
        }

        if (Array.isArray(error.response.data.error.errors)) {
          error.response.data.error.errors.forEach((err: any) => {
            this.toastService.error('Error!', `${err.message || err}`, 5000, 'bg-danger text-white');
          });
        }
      });
  }

  updateDetails() {
    const updatedPayload = this.getFilledFields();

    if (Object.keys(updatedPayload).length === 0) {
      this.toastService.error('Error!', 'No field to update', 5000, 'bg-danger text-white');
      return;
    }
    this.apiService.update('user/me/update', updatedPayload)
      .then(async response => {
        this.toastService.show('Success', `${response.data.message}`, 5000, 'bg-success text-white');
        location.reload();
      })
      .catch(error => {
        if (error.response.data) {
          this.toastService.error('Error!', `${error.response.data.message}`, 5000, 'bg-danger text-white');
        }

        if (Array.isArray(error.response.data.error.errors)) {
          error.response.data.error.errors.forEach((err: any) => {
            this.toastService.error('Error!', `${err.message || err}`, 5000, 'bg-danger text-white');
          });
        }
      });

  }

  getFilledFields() {
    const filedFields: any = {};

    // get the current form value
    const formValue = this.updateForm.value;

    Object.keys(formValue).forEach(key => {
      if (formValue[key] && formValue[key].trim() !== '') {
        filedFields[key] = formValue[key];
      }
    });
    return filedFields;
  }

  // Angular service example
  uploadImage() {
    if (!this.selectedFile) {
      this.toastService.error('Error!', 'Please select a file to upload.', 5000, 'bg-danger text-white');
      return;
    }

    const formData = new FormData();
    formData.append('picture', this.selectedFile, this.selectedFile.name);

    this.apiService.update('user/picture', formData) // Ensure this matches your Express route
      .then(response => {
        this.toastService.show('Success!', 'Your image has been uploaded.', 5000, 'bg-success text-white');
        setTimeout(() => {
          location.reload();
        }, 3000);
      })
      .catch(error => {
        console.error('Upload error:', error);

        if (error.response && error.response.data) {
          this.toastService.error('Error!', `${error.response.data.message}`, 5000, 'bg-danger text-white');

          if (Array.isArray(error.response.data.error?.errors)) {
            error.response.data.error.errors.forEach((err: any) => {
              this.toastService.error('Error!', `${err.message || err}`, 5000, 'bg-danger text-white');
            });
          }
        } else {
          this.toastService.error('Error!', 'An unexpected error occurred.', 5000, 'bg-danger text-white');
        }
      });
  }
}
