import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class GadgetsService {

  constructor() { }
  private apiService = inject(ApiService)

  private eventDetailSource = new BehaviorSubject<any>(null);
  private allEventsSource = new BehaviorSubject<any[]>([]);
  private newEventsSource = new BehaviorSubject<any[]>([]);
  eventDetail$ = this.eventDetailSource.asObservable();
  allEventsList$ = this.allEventsSource.asObservable();
  newEventsList$ = this.newEventsSource.asObservable();

  // allEvents: any;
  // newevents: any

  setEventDetail(eventDetail: any) {
    this.eventDetailSource.next(eventDetail);
  }

  setNewEvent(newEvents: any) {
    this.newEventsSource.next(newEvents)
  }

  setAllEvents(allEvents: any) {
    this.allEventsSource.next(allEvents)
  }

  public async getEventDetail(id: any) {
    try {
      const response = await this.apiService.get(`event/event/${id}`)
      if (response.data && response.data.event) {
        this.setEventDetail(response.data.event)
        // Trigger modal opening here
      }
    } catch (error) {

    }
  }

  public async getnewEvents() {
    try {
      const newEvents = await this.apiService.get('event/newevents')
      if (newEvents.data && newEvents.data.event) {
        this.setNewEvent(newEvents.data.event)
      }
    } catch (error) {

    }
  }

  public async getAllEvents() {
    try {
      const allevents = await this.apiService.get('event/events')
      if (allevents.data && allevents.data.events) {
        this.setAllEvents(allevents.data.events)
      }
    } catch (error) {

    }
  }
}
