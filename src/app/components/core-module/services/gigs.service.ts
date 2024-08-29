import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class GigsService {


  private apiService = inject(ApiService)

  private gigsDetailSource = new BehaviorSubject<any>(null);
  private allGigssSource = new BehaviorSubject<any[]>([]);
  private newGigssSource = new BehaviorSubject<any[]>([]);
  gigsDetail$ = this.gigsDetailSource.asObservable();
  allGigssList$ = this.allGigssSource.asObservable();
  newGigssList$ = this.newGigssSource.asObservable();

  // allGigss: any;
  // newgigss: any

  setGigsDetail(gigsDetail: any) {
    this.gigsDetailSource.next(gigsDetail);
  }

  setNewGigs(newGigss: any) {
    this.newGigssSource.next(newGigss)
  }

  setAllGigss(allGigss: any) {
    this.allGigssSource.next(allGigss)
  }

  public async getGigsDetail(id: any) {
    try {
      const response = await this.apiService.get(`gigs/gigs/${id}`)
      if (response.data && response.data.gigs) {
        this.setGigsDetail(response.data.gigs)
        // Trigger modal opening here
      }
    } catch (error) {

    }
  }

  public async getnewGigss() {
    try {
      const newGigss = await this.apiService.get('gigs/newgigss')
      if (newGigss.data && newGigss.data.gigs) {
        this.setNewGigs(newGigss.data.gigs)
      }
    } catch (error) {

    }
  }

  public async getAllGigss() {
    try {
      const allgigss = await this.apiService.get('gigs/gigss')
      if (allgigss.data && allgigss.data.gigss) {
        this.setAllGigss(allgigss.data.gigss)
      }
    } catch (error) {

    }
  }
}
