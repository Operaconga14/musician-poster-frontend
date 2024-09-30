import { HttpClient } from '@angular/common/http';
import { EventEmitter, inject, Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { environment } from '../../../environments/environments';


@Injectable({
  providedIn: 'root'
})
export class ApiService {


  server = environment.api_url;
  authenticationFailEvent = new EventEmitter;
  private http = inject(HttpClient);


  constructor() {
    axios.defaults.withCredentials = true;
  }


  // http get method
  get(path: any): Promise<AxiosResponse<any>> {
    const token = localStorage.getItem('token');
    return axios.get(`${this.server}${path}`, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`, // Add token to Authorization header
        'Content-Type': 'application/json',
      }
    });
  }
  // gettp(path: any): Observable<any> {
  //   const token = localStorage.getItem('token')

  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${token}`, // Add token to Authorization header
  //     'Content-Type': 'application/json',
  //   })
  //   return this.http.get<any[]>(`${this.server}${path}`);
  // }

  // http post method
  post(path: any, data: any): Promise<AxiosResponse<any>> {
    const token = localStorage.getItem('token');
    // / Check if the data is FormData and don't set Content-Type for it;
    const headers: any = {
      'Authorization': `Bearer ${token}`, // Add token to Authorization header
    };

    // Only set Content-Type if the data is not FormData
    if (!(data instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    return axios.post(`${this.server}${path}`, data, {
      withCredentials: true, // Send cookies if needed
      headers: headers
    });
  }

  patch(path: any, data: any): Promise<AxiosResponse<any>> {
    const token = localStorage.getItem('token');
    const headers: any = {
      'Authorization': `Bearer ${token}`, // Add token to Authorization header
    };

    if (!(data instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }


    return axios.patch(`${this.server}${path}`, data, {
      withCredentials: true, // Send cookies if needed
      headers: headers
    });
  }

  // update http method
  update(path: any, data: any): Promise<AxiosResponse<any>> {
    const token = localStorage.getItem('token');
    // Check if the data is FormData and don't set Content-Type for it
    const headers: any = {
      'Authorization': `Bearer ${token}`, // Add token to Authorization header
    };

    // Only set Content-Type if the data is not FormData
    if (!(data instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    return axios.put(`${this.server}${path}`, data, {
      withCredentials: true, // Send cookies if needed
      headers: headers
    });
  }

  delete(path: any): Promise<AxiosResponse<any>> {
    const token = localStorage.getItem('token');
    return axios.delete(`${this.server}${path}`, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`, // Add token to Authorization header
        'Content-Type': 'application/json',
      }
    });
  }
}
