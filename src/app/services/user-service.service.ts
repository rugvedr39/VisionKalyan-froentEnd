import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private apiUrl = `${environment.backendUrl}users`; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
    const url = `${this.apiUrl}/get-all-users`;
    const users: any[] = [];

    const fetchPage = (page: number): Observable<any> => {
      const pageUrl = `${url}?page=${page}`;
      return this.http.get(pageUrl);
    };

    const getNextPage = (page: number, observer: Observer<any>): void => {
      fetchPage(page).subscribe(response => {
        if (response && response.success && response.users.length > 0) {
          users.push(...response.users);
          getNextPage(page + 1, observer);
        } else {
          // Emit the accumulated users or an empty array if there are none
          observer.next(users);
          observer.complete();
        }
      }, error => {
        // Handle errors
        observer.error(error);
        observer.complete();
      });
    };

    return new Observable(observer => {
      getNextPage(1, observer);
    });
  }

  updateUser(userId: string, userData: any): Observable<any> {
    const url = `${this.apiUrl}/update-user/${userId}`;
    return this.http.put(url, userData);
}
getUpcomingBirthdays(): Observable<any> {
  return this.http.get(`${this.apiUrl}/upcoming-birthdays`);
}
}
