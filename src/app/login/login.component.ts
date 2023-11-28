import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationServiceService } from '../authentication/authentication-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent   {
  username: string='admin';
  password: any='Pass@123';
  
  constructor(private authService: AuthenticationServiceService, private router: Router) {}


login() {
if (this.username=='admin' && this.password=='Pass@123') {
  if (this.authService.login(this.username, this.password)) {
    this.router.navigate(['/admin']);
  } else {
    // Handle failed login
  }
}else{
  alert('invalid login')
}
}

}
