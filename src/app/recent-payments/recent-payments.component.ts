import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environment/environment';
import { DataSharingService } from '../services/data-sharing.service';

@Component({
  selector: 'app-recent-payments',
  templateUrl: './recent-payments.component.html',
  styleUrls: ['./recent-payments.component.css']
})
export class RecentPaymentsComponent {
  data:any
  constructor(public http:HttpClient,private dataSharingService: DataSharingService) {
    this.http.get(`${environment.backendUrl}payouts/payment/done-get`).subscribe((response:any) => {
    this.data=response.data
    this.loadRecentPayments()
    })
  }

  transformDateTime(value: string): string {
    const date = new Date(value);
    // Get day, month, and year components
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based
    const year = date.getFullYear();
    // Pad single-digit day and month with leading zero
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    // Create the formatted date string in dd-mm-yyyy format
    const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;
    return formattedDate;
  }

  dateFilter: string = '';
  get filteredData() {
    return this.data?.filter((entry:any) =>
      entry['Date'].includes(this.dateFilter)
    );
  }

  loadRecentPayments(): void {
    this.dataSharingService.updateRecentPayments(this.data);
  }
}
