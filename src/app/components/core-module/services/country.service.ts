import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  country_api = environment.country_api

  private http = inject(HttpClient)

  constructor() { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getCountries()
  }

  getCountries(): Observable<any[]> {
    return this.http.get<any[]>(this.country_api)
  }
}
