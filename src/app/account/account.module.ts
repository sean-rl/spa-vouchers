import { AccountRoutingModule } from './account-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountBookingsComponent } from './bookings/bookings.component';
import { AccountDetailComponent } from './detail/detail.component';
import { AccountLoginComponent } from './login/login.component';
import { AccountOrdersComponent } from './orders/orders.component';
import { AccountPageComponent } from './page/account.component';
import { AccountVouchersComponent } from './vouchers/vouchers.component';
import { AppSharedModule } from '../_shared/app.shared.module';
import { PipesModule } from '../_shared/pipes/pipes.module';
import { AppMaterialModule } from '../app.material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    PipesModule,
    AppSharedModule,
    AccountRoutingModule
  ],
  declarations: [
    AccountPageComponent,
    AccountLoginComponent,
    AccountDetailComponent,
    AccountBookingsComponent,
    AccountOrdersComponent,
    AccountVouchersComponent
  ]
})
export class AccountModule {}
