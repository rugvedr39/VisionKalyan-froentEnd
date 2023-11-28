import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-payout',
  templateUrl: './payout.component.html',
  styleUrls: ['./payout.component.css']
})
export class PayoutComponent {
  totalAmountsByUser: any;
  unpaidIds:any
  constructor(public http:HttpClient) {
    this.http.get('https://free.rrinstitute.cloud/payouts/payoutdetails').subscribe((response:any)=>{
      this.unpaidIds=response.unpaidIds
      console.log(response.totalAmountsByUser);
      
      this.totalAmountsByUser = response.totalAmountsByUser.map((entry:any) => ({
        Name: entry.userDetails?.name,
        'Bank Name': entry.userDetails?.bankDetails?.bankName,
        'Bank IFSC Code': entry.userDetails?.bankDetails?.ifscCode,
        'Bank Account Number': entry.userDetails?.bankDetails?.accountNumber,
        'PAN Number': entry.userDetails?.panNumber,
        'Total Income': entry.amount,
        'TDS': entry.amount*0.05,
        'Net Payable': entry.amount-entry.amount*0.05,
        ids:entry.ids
      }));
    });
   }
  //
   Procced() {
    this.http.post('https://free.rrinstitute.cloud/payouts/procced',{unpaidIds:this.unpaidIds,data:this.totalAmountsByUser}).subscribe((data:any) => {
      alert(data.message);
    })
  }


downloadExcel() {
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.totalAmountsByUser);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'PayoutDetails');
  XLSX.writeFile(wb, 'payout_details.xlsx');
}
}
