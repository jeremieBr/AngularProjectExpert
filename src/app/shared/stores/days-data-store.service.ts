import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export const DEFAULT_DAYS: number = 12;

@Injectable({
  providedIn: 'root',
})
export class DaysDataStoreService {
  private readonly daysOfData$ = new BehaviorSubject<number>(DEFAULT_DAYS);

  /**
   * Set number of days
   * @param daysToDisplay Number of days used for match history
   */
  setDaysOfData(daysToDisplay: number): void {
    this.daysOfData$.next(daysToDisplay);
  }

  /**
   *
   * @returns Observable of number of days used for match history
   */
  getDaysOfData$(): Observable<number> {
    return this.daysOfData$.asObservable();
  }

  /**
   * Number of days used for match history
   */
  get currentDaysOfData(): number {
    return this.daysOfData$.value;
  }
}
