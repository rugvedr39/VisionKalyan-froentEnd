import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environment/environment';
import { DataSharingService } from '../services/data-sharing.service';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';
import { UserServiceService } from '../services/user-service.service';

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
topUsers: any;
unpaydata: any;
  upcomingBirthdays: any;

  constructor(private http: HttpClient,private dataSharingService: DataSharingService,private datePipe: DatePipe,  private userService: UserServiceService,){
    const currentDate = new Date();
    this.selectedDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
    this.initializeData();
  }

  async initializeData() {
    await this.getUsersByDate();
    await this.gettopUsers();
    await this.unpaydataget();
    await this.getUpcomingBirthdays();
  }

  
  sendMessage(name: any,phone: any,username: any) {
    const message = this.createEMIMessage(name, username, 2000);
    const formattedPhone = '91' + phone;
    this.http.post(`${environment.backendUrl}send-Whatsapp`,{ number: formattedPhone, message }).subscribe((data:any) =>{
      alert(data.data)
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

async getUsersByDate() {
  const formattedDate = this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd');
  const url = `${environment.backendUrl}emi/getemibydate/${formattedDate}`;

  try {
    const data = await this.http.get<any[]>(url).toPromise();
    this.users = data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

async gettopUsers() {
  const url = `${environment.backendUrl}topusers`;
  try {
    const response: any = await this.http.get(url).toPromise();
    this.topUsers = response.topUsers;
  } catch (error) {
    console.error('Error fetching top users:', error);
  }
}

async unpaydataget() {
  const url = `${environment.backendUrl}emi`;
  try {
    const response: any = await this.http.get(url).toPromise();
    this.unpaydata = response;
  } catch (error) {
    console.error('Error fetching unpay data:', error);
  }
}

createEMIMessage = (recipientName: any, accountID: any, pendingEMIAmount: any) => {
  return `
  Hi ${recipientName},

  I wanted to bring to your attention that we have noticed that the EMI for your account with ID ${accountID} is pending for this month. We kindly request you to make the payment at your earliest convenience to avoid any inconvenience.

  Please find the details below:
  - Account ID: ${accountID}
  - Pending EMI Amount: ${pendingEMIAmount}

  You can make the payment through Our Website to the following account:

  If you have already made the payment, please disregard this message.

  Thank you for your prompt attention to this matter. Feel free to reach out if you have any questions or concerns.

  Best regards,
  Vision Kalyan`;
};

getUpcomingBirthdays(): void {
  this.userService.getUpcomingBirthdays().subscribe(
    (response: any) => {
      this.upcomingBirthdays = response.users;
      console.log('Upcoming birthdays:', this.upcomingBirthdays);
      
    },
    (error) => {
      console.error('Error fetching upcoming birthdays:', error);
    }
  );
}
}
