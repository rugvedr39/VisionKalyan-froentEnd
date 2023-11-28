import { Component } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormArray , AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent {


  users: any[] | undefined;
  updateUser: any;
  userForm!: FormGroup;
  bankDetailsArray: AbstractControl[] = [];
accountNumber: any;
ifscCode: any;
bankName: any;
loading: boolean=false;

  constructor(
    private userService: UserServiceService,
    private http: HttpClient,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loading = true; 
    this.userService.getAllUsers().subscribe(
      (response: any) => {
        this.users = response.users;
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
    const url = `https://free.rrinstitute.cloud/users/users/${username}`;
    this.http.get(url).subscribe((response: any) => {
      this.updateUser = response.user;
      this.accountNumber= response.user.bankDetails?.accountNumber
      this.ifscCode= response.user.bankDetails?.ifsccode
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
      const url = `https://free.rrinstitute.cloud/users/update/${this.updateUser._id}`
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

  bankDeatils() {
    this.userForm.value.bankDetails = {'accountNumber':this.accountNumber,'bankName':this.bankName,'ifscCode':this.ifscCode}
    }

    transformDateTime(value: string): string {
      const date = new Date(value);
      return date.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
    }
}
