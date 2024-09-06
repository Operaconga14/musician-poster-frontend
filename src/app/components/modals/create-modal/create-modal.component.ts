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

  private router = inject(Router)
  private modalService = inject(ModalService)

  getandRedirect(selsctedElement: HTMLSelectElement) {
    const selectedOption = selsctedElement.value

    switch (selectedOption) {
      case 'post':
        this.router.navigate(['create-post'])
        break;
      case 'vacancy':
        this.router.navigate(['create-vacancy'])
        break;
      case 'event':
        this.router.navigate(['create-event'])
        break
      case 'gigs':
        this.router.navigate(['create-gigs'])
        break
      case 'service':
        this.router.navigate(['create-service'])
        break
      case 'gadget':
        this.router.navigate(['create-gadget'])
        break
      default:
        break;
    }

    this.modalService.closeModal()
  }
}
