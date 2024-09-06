import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { USER_KEY } from '../../../constances';
import { User } from '../models/user.model';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUser$ = new BehaviorSubject<User | undefined>(undefined)
  private eventcountSource = new BehaviorSubject<any>(null)
  private gigcountSource = new BehaviorSubject<any>(null)
  private servicecountSource = new BehaviorSubject<any>(null)
  private vacancycountSource = new BehaviorSubject<any>(null)
  private gadgetcountSource = new BehaviorSubject<any>(null)
  eventCountNumber$ = this.eventcountSource.asObservable()
  gigCountNumber$ = this.gigcountSource.asObservable()
  serviceCountNumber$ = this.servicecountSource.asObservable()
  vacancyCountNumber$ = this.vacancycountSource.asObservable()
  gadgetCountNumber$ = this.gadgetcountSource.asObservable()

  private apiService = inject(ApiService)

  // eventCount: any

  constructor() {
    const jsonStr = localStorage.getItem(USER_KEY);
    if (jsonStr) {
      const user = JSON.parse(jsonStr);
      if (!user) {
        this.currentUser$.next(user)
      }
    }

  }

  setEventCount(eventsCounts: any) {
    this.eventcountSource.next(eventsCounts)
  }

  setGigCount(gigsCount: any) {
    this.gigcountSource.next(gigsCount)
  }

  setServiceCount(serviceCount: any) {
    this.servicecountSource.next(serviceCount)
  }

  setVacancyCount(vacancyCount: any) {
    this.vacancycountSource.next(vacancyCount)
  }

  setGadgetcount(gadgetCount: any) {
    this.gadgetcountSource.next(gadgetCount)
  }

  public async getEventCounts() {
    const eventCounts = await this.apiService.get('event/my')
    if (eventCounts.data && eventCounts.data.eventCount) {
      this.setEventCount(eventCounts.data.eventCount)
    }
  }

  public async getGigsCounts() {
    const gigCounts = await this.apiService.get('gig/my')
    if (gigCounts.data && gigCounts.data.gigCount) {
      console.log('gig count: ', gigCounts.data.gigCount)
      this.setGigCount( gigCounts.data.gigCount)
    }
  }

  public async getServiceCounts() {
    const serviceCounts = await this.apiService.get('service/my')
    if (serviceCounts.data && serviceCounts.data.serviceCount) {
      console.log('service count: ', serviceCounts.data)
      this.setServiceCount( serviceCounts.data.serviceCount)
    }
  }

  public async getVacacyCounts() {
    const vacancyCounts = await this.apiService.get('vacancy/my')
    if (vacancyCounts.data && vacancyCounts.data.vacancyCount) {
      console.log('vacancy count: ', vacancyCounts.data)
      this.setVacancyCount( vacancyCounts.data.vacancyCount)
    }
  }

  public async getGadgetCount() {
    const gadgetCounts = await this.apiService.get('gadget/my')
    if (gadgetCounts.data && gadgetCounts.data.gadgetCount) {
      console.log('gadget count: ', gadgetCounts.data)
      this.setGadgetcount( gadgetCounts.data.gadgetCount)
    }
  }

  public get CurrentUser() {
    return this.currentUser$.value
  }


  /************************************************
  * SET FUNCTION
  *************************************************/
  set(user: any) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    this.currentUser$.next(user);
  }


  /************************************************
    * RESET FUNCTION
    *************************************************/
  reset() {
    localStorage.removeItem(USER_KEY);
    this.currentUser$.next(undefined);
  }
}
