import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { User } from "../../core-module/models/user.model";
import { ApiService } from '../../core-module/services/api.service';
import { AppToastService } from '../../core-module/services/app-toast.service';
import { AuthService } from '../../core-module/services/auth.service';
import { ModalService } from '../../core-module/services/modal.service';
import { UserService } from '../../core-module/services/user.service';
import { CreateModalComponent } from '../../modals/create-modal/create-modal.component';
import { ChangePasswordComponent } from "../change-password/change-password.component";
import { EditProfileComponent } from "../edit-profile/edit-profile.component";

axios.defaults.withCredentials = true
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, EditProfileComponent, ChangePasswordComponent, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  user_details: any
  currentUser: User | any = null
  // profileImage: FormGroup
  profileImage: FormControl
  token: any
  eventNumber: any
  gadgetNumber: any
  serviceNumber: any
  gigNumber: any
  postNumber: any
  vacancyNumber: any


  private authService = inject(AuthService)
  private apiService = inject(ApiService)
  private router = inject(Router)
  private toastService = inject(AppToastService)
  private userService = inject(UserService)
  private modalService = inject(ModalService)

  constructor() {
    this.profileImage = new FormControl([Validators.required])
    // get user evnts count
    // this.userService.getAllmyEvents()
    this.userService.getEventCounts()
    this.userService.getGadgetCount()
    this.userService.getGigsCounts()
    this.userService.getServiceCounts()
    this.userService.getVacacyCounts()
    this.userService.eventCountNumber$.subscribe(eventsnumber => {
      this.eventNumber = eventsnumber
    })
    this.userService.gadgetCountNumber$.subscribe(gadgetsumber => {
      this.gadgetNumber = gadgetsumber
    })
    this.userService.serviceCountNumber$.subscribe(servicesnumber => {
      this.serviceNumber = servicesnumber
    })
    this.userService.gigCountNumber$.subscribe(gigsnumber => {
      this.gigNumber = gigsnumber
    })
    this.userService.vacancyCountNumber$.subscribe(vacanciesnumber => {
      this.vacancyNumber = vacanciesnumber
    })


  }




  async ngOnInit(): Promise<void> {
    this.loadUserDetails()
  }

  loadUserDetails() {
    const token = this.authService.getLocaleStorage()
    if (!token) {
      this.toastService.error('Error!', `Login first`, 5000, 'bg-danger text-white')
      this.router.navigate(['auth/login'])
    }

    this.apiService.get('user/me')
      .then(response => {
        this.user_details = response.data.user
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

  logout() {
    this.authService.signOut()
    this.router.navigate(['auth/login'])
  }

  showCreateOptionModal() {
    this.modalService.openModal(CreateModalComponent)
  }

}
