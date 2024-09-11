import { EventEmitter, Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { environment } from '../../../environments/environments';


@Injectable({
  providedIn: 'root'
})
export class ApiService {


  server = environment.cloud_api_url;
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
        Authorization: `Bearer ${token}`
      }
    });
  }

  // http post method
  post(path: any, data: any): Promise<AxiosResponse<any>> {
    return axios.post(`${this.server}${path}`, data, {
      withCredentials: true
    });
  }

  // update http method
  update(path: any, data: any): Promise<AxiosResponse<any>> {
    const token = localStorage.getItem('token');
    return axios.put(`${this.server}${path}`, data, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  delete(path: any): Promise<AxiosResponse<any>> {
    const token = localStorage.getItem('token')
    return axios.delete(`${this.server}${path}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}
