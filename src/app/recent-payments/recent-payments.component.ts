import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environment/environment';
import { DataSharingService } from '../services/data-sharing.service';

@Component({
  selector: 'app-recent-payments',
  templateUrl: './recent-payments.component.html',
  styleUrls: ['./recent-payments.component.css']
})
export class RecentPaymentsComponent {
searchTerm: any;
  data: any[] = [];
  paginatedData: any[] = []; // Separate array for paginated data
  currentPage: number = 1;
  itemsPerPage: number = 50;
  totalItems: number = 0;
  totalPages: number = 0;
  maxDisplayedPages: number = 5;

  constructor(public http: HttpClient, private dataSharingService: DataSharingService) {
    this.loadData();
  }

  loadData() {
    let params = new HttpParams()
      .set('page', this.currentPage.toString())
      .set('limit', this.itemsPerPage.toString());
      
    if (this.searchTerm) {
      params = params.set('search', this.searchTerm);
    }
    this.http.get(`${environment.backendUrl}payouts/payment/done-get`, { params }).subscribe((response: any) => {
      this.data = response.data;
      this.totalItems = response.pagination.totalItems;
      this.totalPages = response.pagination.totalPages;
    });
  }

  transformDateTime(value: string): string {
    const date = new Date(value);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;
    return formattedDate;
  }

  dateFilter: string = '';



  get totalPagesArray() {
    return Array(this.totalPages).fill(0).map((_, i) => i + 1); // Corrected the typo
  }

  get displayedPages() {
    const half = Math.floor(this.maxDisplayedPages / 2);
    let start = Math.max(1, this.currentPage - half);
    let end = Math.min(this.totalPages, this.currentPage + half);

    if (start === 1) {
      end = Math.min(this.maxDisplayedPages, this.totalPages);
    } else if (end === this.totalPages) {
      start = Math.max(1, this.totalPages - this.maxDisplayedPages + 1);
    }

    return Array(end - start + 1).fill(0).map((_, i) => i + start); // Corrected the typo
  }

  searchData() {
    this.currentPage = 1;
    this.loadData();
  }

  changePage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadData(); // Load data for the new page
    }
  }

  loadRecentPayments(): void {
    this.dataSharingService.updateRecentPayments(this.data);
  }
}