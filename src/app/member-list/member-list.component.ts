import { environment } from './../../environment/environment.prod';
import { Component } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormArray , AbstractControl} from '@angular/forms';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent {


  externalUrl = 'https://user.visionkalyan.com/login';
  date: any=this.getCurrentDateTime();
  searchTerm: string = '';
  topupAmount: any;
  userpayedemi:any


loginUser(_t25: any) {  
  const queryParams = {
  username: _t25.username,
  params: _t25.password
};
  let urlWithParams=  this.constructUrlWithParams(this.externalUrl, queryParams);
  window.open(urlWithParams, '_blank');
}


constructUrlWithParams(url: string, params: any): string {
  const queryString = Object.keys(params)
    .map(key => key + '=' + encodeURIComponent(params[key]))
    .join('&');

  return url + '?' + queryString;
}

  users: any[] | undefined;
  updateUser: any;
  userForm!: FormGroup;
  bankDetailsArray: AbstractControl[] = [];
  accountNumber: any;
  ifscCode: any;
  bankName: any;
  loading: boolean=false;
  addemiUsername:any;
  totalAmount :any

  constructor(
    private userService: UserServiceService,
    private http: HttpClient,
    private fb: FormBuilder,
    private paymentService: PaymentService,
  ) { }

  ngOnInit(): void {
    this.loading = true; 
    this.userService.getAllUsers().subscribe(
      (response: any) => {
        this.users = response;
        this.loading = false; 
      },
      (error) => {
        console.error('Error fetching users:', error);
        this.loading = false; 
      }
    );
    this.initializeForm();
  }

  editUser(user: any): void {
    this.getUserByUsername(user);
  }

  getUserByUsername(username: string): void {
    this.loading = true; 
    const url = `${environment.backendUrl}users/users/${username}`;
    this.http.get(url).subscribe((response: any) => {
      this.updateUser = response.user;
      this.accountNumber= response.user.bankDetails?.accountNumber
      this.ifscCode= response.user.bankDetails?.ifscCode
      this.bankName= response.user.bankDetails?.bankName
      this.patchFormValues();
      this.loading = false;
    });
  }

  initializeForm() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      panNumber: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      bankDetails: []=[],
      email: ['', [Validators.required, Validators.email]]
    });
  }
  

  onSubmit() {
    console.log(this.userForm);
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      const url = `${environment.backendUrl}users/update/${this.updateUser._id}`
      this.http.put(url,this.userForm.value).subscribe((data:any) => {
        alert(data.message)
      })
    } else {
      // Handle form validation errors
    }
  }

  patchFormValues() {
    this.userForm.patchValue({
      username: this.updateUser.username,
      name: this.updateUser.name,
      password: this.updateUser.password,
      panNumber: this.updateUser.panNumber,
      sponsorId: this.updateUser.sponsorId,
      createdAt: this.updateUser.createdAt,
      phoneNumber: this.updateUser.phoneNumber,
      email: this.updateUser.email,
      downline: this.updateUser.downline,
    });
  }


  get filteredUsers() {
    return this.users!.filter(user => {
        const phoneNumber = typeof user.phoneNumber === 'string' ? user.phoneNumber : String(user.phoneNumber);
        return user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            phoneNumber.includes(this.searchTerm) ||
            user.username.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
}


  bankDeatils() {
    this.userForm.value.bankDetails = {'accountNumber':this.accountNumber,'bankName':this.bankName,'ifscCode':this.ifscCode}
    }

    transformDateTime(value: string): string {
      const date = new Date(value);
    
      // Get day, month, and year components
      const day = date.getDate();
      const month = date.getMonth() + 1; // Months are zero-based
      const year = date.getFullYear();
    
      // Get hours, minutes, and seconds components
      let hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      // Determine AM/PM
      const amPm = hours >= 12 ? 'PM' : 'AM';
      // Convert hours to 12-hour format
      hours = hours % 12 || 12;
      // Pad single-digit day, month, hours, minutes, and seconds with leading zero
      const formattedDay = day < 10 ? `0${day}` : `${day}`;
      const formattedMonth = month < 10 ? `0${month}` : `${month}`;
      const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      // Create the formatted date string in dd-mm-yyyy hh:mm:ss AM/PM format
      const formattedDate = `${formattedDay}-${formattedMonth}-${year} ${formattedHours}:${formattedMinutes}:${formattedSeconds} ${amPm}`;
      return formattedDate;
    }

    getCurrentDateTime(): string {
      const now = new Date();
      // Format the date as 'yyyy-MM-dd HH:mm:ss'
      const formattedDate = `${now.getFullYear()}-${this.padNumber(now.getMonth() + 1)}-${this.padNumber(now.getDate())} ${this.padNumber(now.getHours())}:${this.padNumber(now.getMinutes())}:${this.padNumber(now.getSeconds())}`;
      return formattedDate;
    }
  
    padNumber(num: number): string {
      return num < 10 ? `0${num}` : num.toString();
    }

    emiusername(username:any) {
      this.addemiUsername= username
      this.gettopuphistory()
      this.getemicount()
      }

    addemi(){
      let { username , date } = {username:this.addemiUsername,date:this.date}
      console.log(username,date);
      
      // Call the service to add payment to the database
      this.paymentService.addPayment({ username, date })
        .subscribe(
          response => {
            alert('Payment added successfully');
          },
          (error) => {
            alert(error);
          }
        );
    }

    topup() {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString('en-GB'); // 'en-GB' represents the date format dd/mm/yyyy
      const topupObject = {
        username: this.addemiUsername,
        date: formattedDate,
        amount: this.topupAmount
      };

      this.http.post(`${environment.backendUrl}extraemi/${this.addemiUsername}`, topupObject).subscribe(
        (response:any) => {
          // Check if success is true and show an alert
          if (response.success) {
            alert('Top-up successful!');
          }
        },
        (error) => {
          console.error('Error in top-up:', error);
        }
      );
    }

    getTotalAmount(topupHistory: any[]): number {
      return topupHistory.reduce((total, entry) => total + entry.amount, 0);
    }
    gettopuphistory() {
       this.http.get(`${environment.backendUrl}extraemi/${this.addemiUsername}`).subscribe((data: any) => {
        this.totalAmount = this.getTotalAmount(data);
      });
    }
    topupDel() {
      this.http.post(`${environment.backendUrl}extraemi/delete/${this.addemiUsername}`, {amount: this.topupAmount}).subscribe(
        (response:any) => {
          // Check if success is true and show an alert
          if (response.success) {
            alert('Top-up Substracted successful!');
          }
        },
        (error) => {
          console.error('Error in top-up:', error);
        }
      );
      }

      getemicount(){
        this.http.get(`${environment.backendUrl}payments/payment/${this.addemiUsername}`).subscribe((data: any) => {
          this.userpayedemi= data.payment.length
        })
      }
}
