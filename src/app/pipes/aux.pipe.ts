import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'aux'
})
export class AuxPipe implements PipeTransform {

  transform(value: any, key: string, texto: string): any {
    if (texto.length > 0) {
      return value.filter( (info: any) => info[key].toLowerCase().indexOf(texto.toLowerCase()) > -1);
    }
    return value;
  }

}
