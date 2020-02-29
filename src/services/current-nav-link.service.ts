import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentNavLinkService {

  private current: string;

  constructor() {
    this.current = 'home';
  }

  setCurrent(current: string): void {
    this.current = current;
  }

  getCurrent(): string {
    return this.current;
  }

}
