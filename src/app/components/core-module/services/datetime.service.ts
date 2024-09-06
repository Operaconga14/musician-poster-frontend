import { Injectable } from '@angular/core';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DatetimeService {
  formatedDAte: any
  formatedTime: any

  public async formatDate(dateString: string): Promise<void> {
    this.formatedDAte = moment(dateString).format('DD-MM-YYYY').toString()
  }

  public async fromatTime(timeString: string): Promise<void> {
    this.formatedTime = moment(timeString, 'HH:mm:ss').format('hh:mm A')
  }
}
