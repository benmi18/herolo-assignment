import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor() {}

  runtimeStringToInt(value: string) {
    if (value) {
      const arr = value.split(' ');
      return Number(arr[0]);
    }
  }
}
