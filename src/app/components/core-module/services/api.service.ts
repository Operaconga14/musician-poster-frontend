import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import axios, { AxiosResponse } from 'axios';


axios.defaults.withCredentials = true
@Injectable({
  providedIn: 'root'
})
export class ApiService {


  server = environment.cloud_api_url
  authenticationFailEvent = new EventEmitter

  private readonly CACHE_DURATION = 30 * 30 * 1000

  constructor() { }


  // http get method
  get(path: any): Promise<AxiosResponse<any>> {
    return axios.get(`${this.server}${path}`, {
      withCredentials: axios.defaults.withCredentials = true
    })
  }

  // http post method
  post(path: any, data: any): Promise<AxiosResponse<any>> {
    return axios.post(`${this.server}${path}`, data, {
      withCredentials: axios.defaults.withCredentials = true
    })
  }

  // update http method
  update(path: any, data: any): Promise<AxiosResponse<any>> {
    return axios.put(`${this.server}${path}`, data, {
      withCredentials: axios.defaults.withCredentials = true
    })
  }
}
