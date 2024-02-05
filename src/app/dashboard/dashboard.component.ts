import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environment/environment';
import { DataSharingService } from '../services/data-sharing.service';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  loading: boolean=false;
  from_tds_date: any;
  to_tds_date: any;
  recentPayments: any[] = [];
  filteredPayments:any
  selectedDate: any;
  users: any;

  constructor(private http: HttpClient,private dataSharingService: DataSharingService,private datePipe: DatePipe){
    const currentDate = new Date();
    this.selectedDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
    this.getUsersByDate()

  }
  
  sendMessage() {
    this.loading=true
    this.http.get(`${environment.backendUrl}emi`).subscribe(data =>{
      this.loading=false;
    })
 }
 async generate_tds() {
  try {
    const response: any = await this.http.get(`${environment.backendUrl}payouts/payment/done-get`).toPromise();
    this.recentPayments = response.data;

    const filteredPayments = this.recentPayments.filter(payment => {
      const paymentDate = new Date(payment.date);
      return paymentDate >= new Date(this.from_tds_date) && paymentDate <= new Date(this.to_tds_date);
    });

    const excludedNames = ['admin', 'VISION KALYAN INFRA PVT LTD'];

    const filteredData = filteredPayments
      .filter(payment => !excludedNames.includes(payment.Name))
      .map((payment, index) => ({
        'Sr No': index + 1,
        'Name': payment.Name,
        'Date of Payout': new Date(payment.date).toLocaleDateString(),
        'Commision': payment['Total Income'],
        'TDS Amount': payment.TDS,
        'Net Payable Amount': payment['Net Payable'],
        'PAN number': payment['PAN Number'],
      }));

    const data = filteredData;
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Save the Excel file
    XLSX.writeFile(wb, 'TDS_Report.xlsx');
  } catch (error) {
    console.error('Error fetching data:', error);
    // Handle the error as needed
  }
}

getUsersByDate() {
  const formattedDate = this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd');
  const url = `${environment.backendUrl}emi/getemibydate/${formattedDate}`;

  this.http.get<any[]>(url).subscribe(
    (data) => {
      this.users = data;
    },
    (error) => {
      console.error('Error fetching users:', error);
    }
  );
}

}
