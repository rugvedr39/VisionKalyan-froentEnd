import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-payout-detils',
  templateUrl: './payout-detils.component.html',
  styleUrls: ['./payout-detils.component.css']
})
export class PayoutDetilsComponent {
  markAsSuccess(_t17: number) {
    this.data[_t17]._id = this.data.id
    this.http.post('https://free.rrinstitute.cloud/payouts/procced/paid',this.data[_t17]).subscribe((data:any)=>{
    this.data=data.data.data
    })
  }
    unpaidid:any
    data:any
  
    constructor(public http:HttpClient) {
      this.http.get('https://free.rrinstitute.cloud/payouts/get/procced').subscribe((response:any) => {
      this.unpaidid = response.data[response.data.length-1].unpaidIds
      this.data=response.data[response.data.length-1].data;
      this.data.id=response.data[response.data.length-1]._id;
      })
    }
  
  }
