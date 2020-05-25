import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogCardService {
  public card: Subject<any>;

  constructor() {
    this.card = new Subject();
  }

  getCurrentCard(): Observable<any> {
    return this.card.asObservable();
  }

  setCurrentCard(card: string): void {
    this.card.next(card);
  }
}
