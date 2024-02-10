import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-payout-detils',
  templateUrl: './payout-detils.component.html',
  styleUrls: ['./payout-detils.component.css']
})
export class PayoutDetilsComponent {
  unpaidid: any;
  data: any[] = [];
  dateFilter: string = '';

  constructor(private http: HttpClient) {
    this.fetchPayoutData();
  }

  fetchPayoutData(): void {
    this.http.get(`${environment.backendUrl}payouts/get/procced`).subscribe((response: any) => {
      if (response && response.data && response.data.length > 0) {
        response.data.forEach((item: any) => {
          this.unpaidid = item.unpaidIds;
          this.data.push(...item.data.map((dataItem: any) => ({ ...dataItem, id: item._id })));
        });
      }
    });
  }

  markAsSuccess(index: number): void {
    const currentDate = new Date();
    this.data[index].date = currentDate;
    this.http.post(`${environment.backendUrl}payouts/procced/paid`, this.data[index]).subscribe((data: any) => {
      alert(data.data);
      this.data.splice(index, 1);
    });
  }

  getTotal(property: string): number {
    return this.data.reduce((sum: any, entry: any) => sum + (entry[property] || 0), 0);
  }

  transformDateTime(value: string): string {
    const date = new Date(value);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    return `${formattedDay}-${formattedMonth}-${year}`;
  }

  get filteredData() {
    return this.data.filter((entry: any) =>
      entry['Date'].includes(this.dateFilter)
    );
  }
  }
