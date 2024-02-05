import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  private recentPaymentsSource = new BehaviorSubject<any[]>([]);
  recentPayments$ = this.recentPaymentsSource.asObservable();

  updateRecentPayments(recentPayments: any[]): void {
    this.recentPaymentsSource.next(recentPayments);
  }

  constructor() { }
}
