import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'diff'
})
export class DiffPipe implements PipeTransform {

  transform(value: any, args: any): any {
    const ms = moment(value,"DD/MM/YYYY HH:mm:ss").diff(moment(args,"DD/MM/YYYY HH:mm:ss"));
    const d = moment.duration(ms);
    const s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
    return s;
  }

}
