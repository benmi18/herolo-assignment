import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleStringify'
})
export class TitleStringifyPipe implements PipeTransform {
  transform(value: string): string {
    value = value.replace(/[!@#$%^&*_(),~+=.?":{}|<>]/g, '');
    return value;
  }
}
