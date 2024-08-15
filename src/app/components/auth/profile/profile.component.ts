import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { User } from "../../core-module/models/user.model";
import { ApiService } from '../../core-module/services/api.service';
import { AuthService } from '../../core-module/services/auth.service';

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


  private authService = inject(AuthService)
  private apiService = inject(ApiService)
  private router = inject(Router)

  constructor() {
    this.image = new FormControl('', [Validators.required])
    // this.profileImage = new FormGroup({
    //   image: new FormControl('', [Validators.required])
    // })
  }


  ngOnInit(): void {
    this.loadUserDetails()
  }

  loadUserDetails() {
    const token = this.authService.getLocaleStorage()
    if (token) {
      this.apiService.get('user/me')
        .then(async res => {
          this.user_details = res.data.user
        })
        .catch(error => {
          console.error('Error fetching user details:', error);
        })
    }
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

}
