import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { from, Observable } from 'rxjs';
import { User } from "../../core-module/models/user.model";
import { ApiService } from '../../core-module/services/api.service';
import { AppToastService } from '../../core-module/services/app-toast.service';
import { AuthService } from '../../core-module/services/auth.service';
import { UtilService } from '../../core-module/services/util.service';

axios.defaults.withCredentials = true
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user_details: any
  currentUser: User | any = null
  // profileImage: FormGroup
  image: FormControl
  userUpdate: FormGroup


  private authService = inject(AuthService)
  private apiService = inject(ApiService)
  private router = inject(Router)
  private toastService = inject(AppToastService)
  private utilService = inject(UtilService)

  constructor() {
    this.loadUserDetails()
    this.image = new FormControl([Validators.required])
    this.userUpdate = new FormGroup({
      facebook: new FormControl(''),
      instagram: new FormControl(''),
      spotify: new FormControl(''),
      tiktok: new FormControl(''),
      youtube: new FormControl(''),
    })
  }


  async ngOnInit(): Promise<void> {
    await this.loadUserDetails()
  }

  async loadUserDetails() {
    const token = this.authService.getLocaleStorage()
    if (token) {
      this.apiService.get('user/me')
        .then(async res => {
          this.user_details = res.data.user
        })
        .catch(error => {
          this.toastService.error('Error!', `${error.response.data.message}`, 5000)
          console.error('Error fetching user details:', error);
        })
    }
  }

  updateInfo() {
    let updatePayload: any = {}
    console.log('Updated Infor: ', this.userUpdate.value)

    if (this.userUpdate.get('facebook')?.value) {
      updatePayload.facebook = this.userUpdate.get('facebook')?.value
    }
    if (this.userUpdate.get('instagram')?.value) {
      updatePayload.instagram = this.userUpdate.get('instagram')?.value
    }
    if (this.userUpdate.get('spotify')?.value) {
      updatePayload.spotify = this.userUpdate.get('spotify')?.value
    }
    if (this.userUpdate.get('tiktok')?.value) {
      updatePayload.tiktok = this.userUpdate.get('tiktok')?.value
    }
    if (this.userUpdate.get('youtube')?.value) {
      updatePayload.youtube = this.userUpdate.get('youtube')?.value
    }

    if (Object.keys(updatePayload).length > 0) {
      this.apiService.update('user/me/update', this.userUpdate.value)
        .then(async result => {
          console.log('Data is: ', result.data)
          this.toastService.show('Success', `${result.data.message}`, 5000, 'bg-success | text-white')
          await this.loadUserDetails()
        })
        .catch(error => {
          console.error(error)
          this.toastService.error('Failed', `${error.response.data.message}`, 5000)
          location.reload()
        })
    } else {
      this.toastService.error('Failed', `No fields to update`, 5000)
      console.warn('No fields to update');
    }
  }

  getUserProfile(): Observable<any> {
    return from(axios.get('user/me'))
  }

  logOut() {
    this.authService.signOut()
    this.router.navigate(['auth/login'])
  }

  // onFileSelected(event: Event) {
  //   const fileInput = event.target as HTMLInputElement
  //   if (fileInput.files && fileInput.files.length > 0) {
  //     const selectedFile = fileInput.files[0];
  //     // this.image.patchValue({ profileImage: selectedFile })
  //     this.image.get('profileImage')?.updateValueAndValidity();

  //     if (this.image.get('profileImage')?.valid) {
  //       this.uploadImage(selectedFile)
  //     }
  //   }
  // }

  // uploadImage(file: File) {
  //   const formData = new FormData()
  //   formData.append('profileImge', file, file.name)
  //   this.apiService.update('user/picture', formData)
  //     .then(async response => {
  //       console.log('Upload successful:', response);
  //     })
  //     .catch(error => {
  //       console.error('Upload failed:', error);
  //     })
  // }

  // updateInfo() {
  //   console.log('Updated Infor: ', this.userUpdate.value)
  //   this.apiService.update('user/me/update', this.userUpdate.value)
  //     .then(async result => {
  //       console.log('Data is: ', result.data)
  //       this.toastService.show('Success', `${result.data.message}`, 5000, 'bg-success | text-white')
  //       await this.loadUserDetails()
  //     })
  //     .catch(error => {
  //       console.error(error)
  //       this.toastService.error('Failed', `${error.response.data.message}`, 5000)
  //       location.reload()
  //     })
  // }

}
