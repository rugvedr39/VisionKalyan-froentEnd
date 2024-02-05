import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MemberListComponent } from './member-list/member-list.component';
import { AdminComponent } from './admin/admin.component';
import { AddEmiComponent } from './add-emi/add-emi.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EPinComponent } from './e-pin/e-pin.component';
import { PayoutComponent } from './payout/payout.component';
import { PayoutDetilsComponent } from './payout-detils/payout-detils.component';
import { RecentPaymentsComponent } from './recent-payments/recent-payments.component';
import { LandComponentComponent } from './land-component/land-component.component';
import { DataSharingService } from './services/data-sharing.service';
import { CommonModule, DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SidebarComponent,
    MemberListComponent,
    AdminComponent,
    AddEmiComponent,
    EPinComponent,
    PayoutComponent,
    PayoutDetilsComponent,
    RecentPaymentsComponent,
    LandComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [DataSharingService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
