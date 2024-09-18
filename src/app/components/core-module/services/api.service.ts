import { EventEmitter, Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { environment } from '../../../environments/environments';


@Injectable({
  providedIn: 'root'
})
export class ApiService {


  server = environment.api_url;
  authenticationFailEvent = new EventEmitter;


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

  // http post method
  post(path: any, data: any): Promise<AxiosResponse<any>> {
    const token = localStorage.getItem('token');
    return axios.post(`${this.server}${path}`, data, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`, // Add token to Authorization header
        'Content-Type': 'application/json',
      }
    });
  }

  // update http method
  update(path: any, data: any): Promise<AxiosResponse<any>> {
    const token = localStorage.getItem('token');
    return axios.put(`${this.server}${path}`, data, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`, // Add token to Authorization header
        'Content-Type': 'application/json',
      }
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
