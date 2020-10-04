import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, key: string, texto: string): any {
    if (texto.length > 0) {
      return value.filter( (info: any) => info.usuario[key].toLowerCase().indexOf(texto.toLowerCase()) > -1);
    }
    return value;
  }

}

