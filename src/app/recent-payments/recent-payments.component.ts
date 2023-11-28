import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-recent-payments',
  templateUrl: './recent-payments.component.html',
  styleUrls: ['./recent-payments.component.css']
})
export class RecentPaymentsComponent {
  data:any
  constructor(public http:HttpClient) {
    this.http.get('https://free.rrinstitute.cloud/payouts/payment/done-get').subscribe((response:any) => {
    this.data=response.data
    })
  }
}
