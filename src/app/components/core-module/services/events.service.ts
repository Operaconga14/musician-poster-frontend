import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  public allEvents: any

  private apiService = inject(ApiService)

  constructor() { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllEvents()
  }

  getAllEvents() {
    this.allEvents = this.apiService.get('event/events')
      .then(async result => {
        this.allEvents = result.data.events
        console.log('All events: ', this.allEvents)
      })
  }
}
