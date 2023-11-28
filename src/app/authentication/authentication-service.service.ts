import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  private isLoggedIn = false;
  constructor() { }
  login(username: string, password: string): boolean {
    // Your authentication logic goes here
    // For simplicity, let's consider any non-empty username and password as a successful login
    this.isLoggedIn = username !== '' && password !== '';
    return this.isLoggedIn;
  }

  logout(): void {
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
