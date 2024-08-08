import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  FILE_TYPE = /^[.]+[jpeg jpg png webg svg]/
  // ['.jpg', '.jpeg', '.png', 'webg', '.svg']
}
