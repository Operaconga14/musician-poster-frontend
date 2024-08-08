import { Component, inject } from '@angular/core';
import { AppToastService } from '../services/app-toast.service';
import { CommonModule } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-toasts',
  standalone: true,
  imports: [CommonModule, NgbToastModule],
  templateUrl: './toasts.component.html',
  styleUrl: './toasts.component.scss'
})
export class ToastsComponent {
  public toastService = inject(AppToastService)
}
