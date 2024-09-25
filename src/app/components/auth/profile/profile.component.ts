import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import axios from 'axios';
import { User } from "../../core-module/models/user.model";
import { TimeFormatPipe } from '../../core-module/pipes/time-format.pipe';
import { ApiService } from '../../core-module/services/api.service';
import { AppToastService } from '../../core-module/services/app-toast.service';
import { AuthService } from '../../core-module/services/auth.service';
import { DatetimeService } from '../../core-module/services/datetime.service';
import { Gigservice } from '../../core-module/services/gigs.service';
import { ModalService } from '../../core-module/services/modal.service';
import { UserService } from '../../core-module/services/user.service';
import { VacanciesService } from '../../core-module/services/vacancies.service';
import { CreateModalComponent } from '../../modals/create-modal/create-modal.component';
import { DeleteModalComponent } from '../../modals/delete-modal/delete-modal.component';
import { GigsModalComponent } from '../../modals/gigs-modal/gigs-modal.component';
import { VacancyModalComponent } from '../../modals/vacancy-modal/vacancy-modal.component';
import { ChangePasswordComponent } from "../change-password/change-password.component";
import { EditProfileComponent } from "../edit-profile/edit-profile.component";

axios.defaults.withCredentials = true;
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, EditProfileComponent, ChangePasswordComponent, CommonModule, TimeFormatPipe, NgbDropdownModule, TimeFormatPipe],
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
  updateGigForm: FormGroup;
  updateVacancyForm: FormGroup;



  private authService = inject(AuthService);
  private apiService = inject(ApiService);
  private router = inject(Router);
  private toastService = inject(AppToastService);
  private userService = inject(UserService);
  private modalService = inject(ModalService);
  public dateTimeService = inject(DatetimeService);
  public gigService = inject(Gigservice);
  public vacancyService = inject(VacanciesService)

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

    this.updateGigForm = new FormGroup({
      type: new FormControl(''),
      description: new FormControl(''),
      contact: new FormControl(''),
      time: new FormControl(''),
      date: new FormControl(''),
      location: new FormControl(''),
      instruments: new FormControl(''),
      price: new FormControl('')
    });

    this.updateVacancyForm = new FormGroup({
      type: new FormControl(''),
      description: new FormControl(''),
      contact: new FormControl(''),
      time: new FormControl(''),
      date: new FormControl(''),
      location: new FormControl(''),
      instruments: new FormControl(''),
      price: new FormControl('')
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
      .then(async response => {
        this.user_details = await response.data.user;
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


  deleteGig(id: any) {
    this.apiService.delete(`gig/delete/${id}`)
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

  deleteVacancy(id: any) {
    this.apiService.delete(`vacancy/delete/${id}`)
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

  updateGig(id: any) {
    const updatedPayload = this.getGigFilledFields();

    if (Object.keys(updatedPayload).length === 0) {
      this.toastService.error('Error!', 'No field to update', 5000, 'bg-danger text-white');
      return;
    }
    this.apiService.update(`gig/update/${id}`, updatedPayload)
      .then(async response => {
        this.toastService.show('Success', `${response.data.message}`, 5000, 'bg-success text-white');
        setTimeout(() => {
          location.reload();
        }, 3000);
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


  updateVacancy(id: any) {
    const updatedPayload = this.getVacancyFilledFields();

    if (Object.keys(updatedPayload).length === 0) {
      this.toastService.error('Error!', 'No field to update', 5000, 'bg-danger text-white');
      return;
    }
    this.apiService.update(`vacancy/update/${id}`, updatedPayload)
      .then(async response => {
        this.toastService.show('Success', `${response.data.message}`, 5000, 'bg-success text-white');
        setTimeout(() => {
          location.reload();
        }, 3000);
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

  getVacancyFilledFields() {
    const filedFields: any = {};

    // get the current form value
    const formValue = this.updateVacancyForm.value;

    Object.keys(formValue).forEach(key => {
      if (formValue[key] && formValue[key].trim() !== '') {
        filedFields[key] = formValue[key];
      }
    });
    return filedFields;
  }


  getGigFilledFields() {
    const filedFields: any = {};

    // get the current form value
    const formValue = this.updateGigForm.value;

    Object.keys(formValue).forEach(key => {
      if (formValue[key] && formValue[key].trim() !== '') {
        filedFields[key] = formValue[key];
      }
    });
    return filedFields;
  }

  async getGigDetail(id: any) {
    this.apiService.get(`gig/gig/${id}`)
      .then(async response => {
        console.log("Gig details", response);
        this.gigService.setGigsDetail(response.data.gig);
        this.modalService.openModal(GigsModalComponent);
      });
  }

  async getvacancyDetail(id: any) {
    this.apiService.get(`vacancy/vacancy/${id}`)
      .then(async response => {
        console.log("Vacancy details", response);
        this.vacancyService.setVacancyDetail(response.data.vacancy);
        this.modalService.openModal(VacancyModalComponent);
      });
  }

}
