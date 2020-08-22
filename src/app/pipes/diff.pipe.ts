import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'diff'
})
export class DiffPipe implements PipeTransform {

  transform(value: any, args: any): any {
    const diff = moment.duration(moment(value, 'YYYY-MM-DD HH:mm:ss').diff(moment(args, 'YYYY-MM-DD HH:mm:ss')));
    return `${diff.asHours().toFixed(0)}h${diff.minutes().toFixed(0)}m${diff.seconds().toFixed(0)}s`;
  }

}
