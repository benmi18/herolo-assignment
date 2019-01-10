import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toInt'
})
export class ToIntPipe implements PipeTransform {
  transform(value: string): number {
    if (value) {
      const arr = value.split(' ');
      return Number(arr[0]);
    }
  }
}
