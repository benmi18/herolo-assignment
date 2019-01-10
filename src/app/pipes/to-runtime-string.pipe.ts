import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toRuntimeString'
})
export class ToRuntimeStringPipe implements PipeTransform {
  transform(value: number): string {
    return `${value} min`;
  }
}
