import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PostGigsComponent } from '../../auth/post-gigs/post-gigs.component';
import { PostVacanciesComponent } from '../../auth/post-vacancies/post-vacancies.component';
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
        this.modalService.closeModal();
        this.modalService.openModal(PostVacanciesComponent);
        break;
      case 'gig':
        this.modalService.closeModal();
        this.modalService.openModal(PostGigsComponent);
        break;
      default:
        break;
    }

  }
}
