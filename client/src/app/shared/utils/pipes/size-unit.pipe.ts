import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'unit', standalone: true})
export class SizeUnitPipe implements PipeTransform {
  transform(value: any): any {
    // kb for now, but this could be a user preference setting later.
    return value > 0 ? `${value / 1000} KB` : '--';
  }
}
