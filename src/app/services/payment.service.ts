import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = 'https://free.rrinstitute.cloud'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  addPayment(paymentData: any): Observable<any> {
    console.log('hh');
    
    const endpoint = `${this.apiUrl}/payments/add`; // Adjust the API endpoint
    return this.http.post<any>(endpoint, paymentData);
  }
}