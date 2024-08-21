import { inject, Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modalService = inject(NgbModal)

  constructor() { }

  openModal(component: any) {
    this.modalService.open(component, { scrollable: true })
  }

  closeModal() {
    this.modalService.dismissAll()
  }
}
