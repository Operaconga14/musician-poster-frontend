import { Component, inject } from '@angular/core';
import { EventsService } from '../../core-module/services/events.service';
import { ModalService } from '../../core-module/services/modal.service';

@Component({
  selector: 'app-event-modal',
  standalone: true,
  imports: [],
  templateUrl: './event-modal.component.html',
  styleUrl: './event-modal.component.scss'
})
export class EventModalComponent {

  private eventService = inject(EventsService)
  private modalService = inject(ModalService)

  eventDetails?: any


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.eventService.eventDetail$.subscribe(details => {
      this.eventDetails = details
      console.log('Event Details: ', details)
    })
  }

  closeModal() {
    this.modalService.closeModal()
  }
}
