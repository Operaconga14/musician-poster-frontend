import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { User } from "../../core-module/models/user.model";
import { TimeFormatPipe } from '../../core-module/pipes/time-format.pipe';
import { ApiService } from '../../core-module/services/api.service';
import { AppToastService } from '../../core-module/services/app-toast.service';
import { AuthService } from '../../core-module/services/auth.service';
import { DatetimeService } from '../../core-module/services/datetime.service';
import { ModalService } from '../../core-module/services/modal.service';
import { UserService } from '../../core-module/services/user.service';
import { CreateModalComponent } from '../../modals/create-modal/create-modal.component';
import { DeleteModalComponent } from '../../modals/delete-modal/delete-modal.component';
import { ChangePasswordComponent } from "../change-password/change-password.component";
import { EditProfileComponent } from "../edit-profile/edit-profile.component";

axios.defaults.withCredentials = true;
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, EditProfileComponent, ChangePasswordComponent, CommonModule, TimeFormatPipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  user_details: any;
  currentUser: User | any = null;
  token: any;
  formatedDate: any;
  formatedTime: any;
  eventNumber: any;
  gadgetNumber: any;
  serviceNumber: any;
  gigNumber: any;
  postNumber: any;
  vacancyNumber: any;
  myGigs: any;
  myVacancy: any;


  private authService = inject(AuthService);
  private apiService = inject(ApiService);
  private router = inject(Router);
  private toastService = inject(AppToastService);
  private userService = inject(UserService);
  private modalService = inject(ModalService);
  public dateTimeService = inject(DatetimeService);

  constructor() {
    // this.userService.getAllmyEvents()
    this.userService.getEventCounts();
    this.userService.getGadgetCount();
    this.userService.getGigsCounts();
    this.userService.getServiceCounts();
    this.userService.getVacacyCounts();
    this.userService.getMygigs();
    this.userService.getMyVacancies();
    this.userService.myVacanciesList$.subscribe(myvacancies => {
      this.myVacancy = myvacancies;
      this.formatedTime = this.dateTimeService.fromatTime(this.myVacancy.time);
    });
    this.userService.myGigsList$.subscribe(mygigs => {
      this.myGigs = mygigs;
      this.formatedTime = this.dateTimeService.fromatTime(this.myGigs.time);
    });

    this.userService.eventCountNumber$.subscribe(eventsnumber => {
      this.eventNumber = eventsnumber;
    });
    this.userService.gadgetCountNumber$.subscribe(gadgetsumber => {
      this.gadgetNumber = gadgetsumber;
    });
    this.userService.serviceCountNumber$.subscribe(servicesnumber => {
      this.serviceNumber = servicesnumber;
    });
    this.userService.gigCountNumber$.subscribe(gigsnumber => {
      this.gigNumber = gigsnumber;
    });
    this.userService.vacancyCountNumber$.subscribe(vacanciesnumber => {
      this.vacancyNumber = vacanciesnumber;
    });



  }




  async ngOnInit(): Promise<void> {
    this.loadUserDetails();
  }

  loadUserDetails() {
    const token = this.authService.getLocaleStorage();
    if (!token) {
      this.toastService.error('Error!', `Login first`, 5000, 'bg-danger text-white');
      this.router.navigate(['auth/login']);
    }

    this.apiService.get('user/me')
      .then(response => {
        this.user_details = response.data.user;
      })
      .catch(error => {
        if (error.response.data) {
          this.toastService.error('Error!', `${error.response.data.message}`, 5000, 'bg-danger text-white');
          this.router.navigate(['auth/login']);
        }

        if (Array.isArray(error.response.data.error.errors)) {
          error.response.data.error.errors.forEach((err: any) => {
            this.toastService.error('Error!', `${err.message || err}`, 5000, 'bg-danger text-white');
          });
          this.router.navigate(['auth/login']);
        }
      });

  }

  logout() {
    this.authService.signOut();
    this.router.navigate(['auth/login']);
  }

  deleteAccount() {
    this.modalService.openModal(DeleteModalComponent);
  }

  showCreateOptionModal() {
    this.modalService.openModal(CreateModalComponent);
  }

}
