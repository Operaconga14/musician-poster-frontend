import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../../core-module/services/modal.service';

@Component({
  selector: 'app-create-modal',
  standalone: true,
  imports: [],
  templateUrl: './create-modal.component.html',
  styleUrl: './create-modal.component.scss'
})
export class CreateModalComponent {

  private router = inject(Router);
  private modalService = inject(ModalService);

  getandRedirect(selsctedElement: HTMLSelectElement) {
    const selectedOption = selsctedElement.value;

    switch (selectedOption) {
      case 'vacancy':
        this.router.navigate(['create-vacancy']);
        break;
      case 'gig':
        this.router.navigate(['create-gig']);
        break;
      default:
        break;
    }

    this.modalService.closeModal();
  }
}
