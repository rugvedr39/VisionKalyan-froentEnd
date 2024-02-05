import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-payout-detils',
  templateUrl: './payout-detils.component.html',
  styleUrls: ['./payout-detils.component.css']
})
export class PayoutDetilsComponent {
  markAsSuccess(_t17: number) {
    const currentDate = new Date();
    this.data[_t17].date = currentDate;
    this.data[_t17]._id = this.data.id
    this.http.post(`${environment.backendUrl}payouts/procced/paid`,this.data[_t17]).subscribe((data:any)=>{
    alert(data.data);
    this.data.splice(_t17,1)
    })
  }
    unpaidid:any
    data:any
  
    constructor(public http:HttpClient) {
      this.http.get(`${environment.backendUrl}payouts/get/procced`).subscribe((response:any) => {
      this.unpaidid = response.data[response.data.length-1].unpaidIds
      this.data=response.data[response.data.length-1].data;
      this.data.id=response.data[response.data.length-1]._id;
      })
    }

    getTotal(property: string): number {
      return this.data.reduce((sum: any, entry: { [x: string]: any; }) => sum + (entry[property] || 0), 0);
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
      return this.data.filter((entry:any) =>
        entry['Date'].includes(this.dateFilter)
      );
    }
  }
