import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'round',
  standalone: true
})
export class RoundPipe implements PipeTransform {

  transform(value: any, decimal: number): unknown {
    if(!isNaN(value)){
      return parseFloat(value).toFixed(decimal);
    }
    return 0;
  }

}
