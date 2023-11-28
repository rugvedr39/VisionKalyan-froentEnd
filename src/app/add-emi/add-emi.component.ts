import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-add-emi',
  templateUrl: './add-emi.component.html',
  styleUrls: ['./add-emi.component.css']
})
export class AddEmiComponent implements OnInit {

date: any=this.getCurrentDateTime();
username: any;

  constructor(private paymentService: PaymentService, private fb: FormBuilder) {}

  ngOnInit() {}

  getCurrentDateTime(): string {
    const now = new Date();
    // Format the date as 'yyyy-MM-dd HH:mm:ss'
    const formattedDate = `${now.getFullYear()}-${this.padNumber(now.getMonth() + 1)}-${this.padNumber(now.getDate())} ${this.padNumber(now.getHours())}:${this.padNumber(now.getMinutes())}:${this.padNumber(now.getSeconds())}`;
    return formattedDate;
  }

  padNumber(num: number): string {
    return num < 10 ? `0${num}` : num.toString();
  }

  submitForm() {
    // Check if the form is valid
    
    if (this.username!=''&&this.date!='') {
      // Get the form values
      const { username , date } ={username:this.username,date:this.date}
      console.log('called service');
      
      // Call the service to add payment to the database
      this.paymentService.addPayment({ username, date })
        .subscribe(
          response => {
            alert('Payment added successfully');
            // You can redirect or show a success message here
          },
          error => {
            alert(error);
            // Handle error, show an error message, etc.
          }
        );
    }
  }
}
