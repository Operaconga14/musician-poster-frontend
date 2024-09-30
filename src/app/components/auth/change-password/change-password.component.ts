import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../core-module/services/api.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  emailControl = new FormControl;

  private apiService = inject(ApiService);


  onChange() {
    console.log("Email Changed ", this.emailControl.value)
    alert(this.emailControl.value)

    this.apiService.patch("user/update/email", this.emailControl.value)
    .then(data => {
      console.log("My response", data.data)
    })
  }
}
