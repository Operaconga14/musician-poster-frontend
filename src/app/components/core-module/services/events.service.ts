import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root'
})
export class EventsService {


  private apiService = inject(ApiService)

  constructor() { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  public async getEventDetail(id: any) {
    console.log("Event Id: ", id)
  }

}
