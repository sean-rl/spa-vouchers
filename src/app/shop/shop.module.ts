import { ShopVouchersComponent } from './vouchers/vouchers.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShopPageComponent } from './page/shop.component';
import { ShopPaymentComponent } from './payment/payment.component';
import { ShopRoutingModule } from './shop-routing.module';
import { ShopService } from '../_shared/services/shop.service';
import { ShopVoucherComponent } from './voucher/voucher.component';
import { AppSharedModule } from '../_shared/app.shared.module';
import { PipesModule } from '../_shared/pipes/pipes.module';
import { AppMaterialModule } from '../app.material.module';
import { PaymentService } from '../_shared/services/payment.service';
import { HttpClientModule } from '@angular/common/http';

const SHOP_COMPONENTS = [
  ShopVoucherComponent,
  ShopVouchersComponent,
  ShopPaymentComponent,
  ShopPageComponent
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    PipesModule,
    AppSharedModule,
    ShopRoutingModule
  ],
  declarations: SHOP_COMPONENTS,
  providers: [ShopService, PaymentService]
})
export class ShopModule {}
