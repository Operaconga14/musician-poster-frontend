import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'timeFormat',
  standalone:true
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return ''
    return moment(value, 'HH:mm:ss').format('hh:mm A');
  }

}
