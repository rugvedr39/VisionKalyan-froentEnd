import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = `${environment.backendUrl}`; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  addPayment(paymentData: any): Observable<any> {
    const endpoint = `${this.apiUrl}payments/add`; // Adjust the API endpoint
    return this.http.post<any>(endpoint, paymentData);
  }
}