import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../core-module/services/api.service';
import { AppToastService } from '../../core-module/services/app-toast.service';
import { AuthService } from '../../core-module/services/auth.service';
import { DatetimeService } from '../../core-module/services/datetime.service';
import { ModalService } from '../../core-module/services/modal.service';
import { UserService } from '../../core-module/services/user.service';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss'
})
export class DeleteModalComponent {

  private toastService = inject(AppToastService);
  private apiService = inject(ApiService);
  private router = inject(Router);
  private modalService = inject(ModalService);
  private authService = inject(AuthService);
  private userService = inject(UserService);
  public dateTimeService = inject(DatetimeService);
  private cookieService = inject(CookieService);

  deleteNow() {
    this.apiService.delete('user/delete')
      .then(response => {
        this.toastService.show('Success!', `${response.data.message}`, 5000, 'bg-success text-white');
        this.modalService.closeModal();
        this.authService.signOut();
        this.cookieService.deleteAll();
        localStorage.clear();
        sessionStorage.clear();
        this.userService.reset();
        localStorage.removeItem('token');
        setTimeout(() => {
          this.router.navigate(['auth/register']);
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

  cancelDelete() {
    this.modalService.closeModal();
  }
}
