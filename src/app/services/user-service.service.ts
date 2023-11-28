import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private apiUrl = 'https://free.rrinstitute.cloud/users'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    const url = `${this.apiUrl}/get-all-users`; // Adjust the endpoint if needed
    return this.http.get(url);
  }

  updateUser(userId: string, userData: any): Observable<any> {
    const url = `${this.apiUrl}/update-user/${userId}`;
    return this.http.put(url, userData);
}
}
