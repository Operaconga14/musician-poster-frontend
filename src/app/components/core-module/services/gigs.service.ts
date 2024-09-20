import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class Gigservice {


  private apiService = inject(ApiService);

  private gigsDetailSource = new BehaviorSubject<any>(null);
  private allGigsource = new BehaviorSubject<any[]>([]);
  private newGigsource = new BehaviorSubject<any[]>([]);
  gigsDetail$ = this.gigsDetailSource.asObservable();
  allGigsList$ = this.allGigsource.asObservable();
  newGigsList$ = this.newGigsource.asObservable();

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getnewGigs();
  }

  setGigsDetail(gigsDetail: any) {
    this.gigsDetailSource.next(gigsDetail);
  }

  setNewGigs(newGigs: any) {
    this.newGigsource.next(newGigs);
  }

  setAllGigs(allGigs: any) {
    this.allGigsource.next(allGigs);
  }

  public async getnewGigs() {
    try {
      const newgigs = await this.apiService.get('gig/newgigs');
      if (newgigs.data && newgigs.data.gig) {
        this.setNewGigs(newgigs.data.gig);

      }
    } catch (error) {
      console.error(error);
    }
  }

  public async getAllGigs() {
    try {
      const allgigs = await this.apiService.get('gig/gigs');
      if (allgigs.data && allgigs.data.gigs) {
        this.setAllGigs(allgigs.data.gigs);
      }
    } catch (error) {

    }
  }
}
