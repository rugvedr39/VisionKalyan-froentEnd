import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MemberListComponent } from './member-list/member-list.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth.guard';
import { AddEmiComponent } from './add-emi/add-emi.component';
import { EPinComponent } from './e-pin/e-pin.component';
import { PayoutComponent } from './payout/payout.component';
import { PayoutDetilsComponent } from './payout-detils/payout-detils.component';
import { RecentPaymentsComponent } from './recent-payments/recent-payments.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',component: AdminComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'member-list', component: MemberListComponent },
      { path: 'e-pin', component: EPinComponent },
      { path: 'add-emi', component: AddEmiComponent },
      { path: 'payout', component: PayoutComponent },
      { path: 'payoutDetails', component: PayoutDetilsComponent },
      { path: 'recentPayments', component: RecentPaymentsComponent },
      // Add more routes as needed
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' } // Default route inside 'admin'
    ],
  },
  // Add additional routes outside of the 'admin' path if needed
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login by default
];;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
