import { Pipe, PipeTransform } from '@angular/core';
import { validationLimit } from '../config/common-config';

@Pipe({
  name: 'truncateString',
  standalone: true
})
export class TruncateStringPipe implements PipeTransform {

  transform(value: string, limit: number = validationLimit.STRING_MAX_LENGTH): string {
    if(!value) return " ";
    return (value.length > limit)? value.slice(0,limit) + "....." : value;
  }

}
