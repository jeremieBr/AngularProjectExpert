import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DaysDataStoreService {
  private readonly daysOfData$ = new BehaviorSubject<number>(12);

  setDaysOfData(daysToDisplay: number): void {
    this.daysOfData$.next(daysToDisplay);
  }

  getDaysOfData$(): Observable<number> {
    return this.daysOfData$.asObservable();
  }

  get currentDaysOfData(): number {
    return this.daysOfData$.value;
  }
}
