import { Injectable } from '@angular/core';
import * as codes from '../../assets/codes.json';

@Injectable({
  providedIn: 'root'
})
export class DialCodesService {

  private dialCodes: any[] = (codes as any).default;

  constructor() { }

  getDialCodes(): any {
    return this.dialCodes
  }
}
