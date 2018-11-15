import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppMaterialModule } from './../app.material.module';
import { ArticleTileComponent } from './components/article-tile/article-tile.component';
import { BannerComponent } from './components/banner/banner.component';
import { BookingTileComponent } from './components/booking-tile/booking-tile.component';
import { OrderTileComponent } from './components/order-tile/order-tile.component';
import { TitleComponent } from './components/title/title.component';
import { VenueTileComponent } from './components/venue-tile/venue-tile.component';
import { VoucherTileComponent } from './components/voucher-tile/voucher-tile.component';
import { PipesModule } from './pipes/pipes.module';
import { UserService } from './services/user.service';
import { NewsService } from './services/news.service';
import { HeadlineTileComponent } from './components/headline-tile/headline-tile.component';
import { HomeArticleTileComponent } from './components/home-article-tile/home-article-tile.component';

const APP_COMPONENTS = [
  HomeArticleTileComponent,
  ArticleTileComponent,
  HeadlineTileComponent,
  VenueTileComponent,
  BookingTileComponent,
  VoucherTileComponent,
  OrderTileComponent,
  TitleComponent,
  BannerComponent
];

@NgModule({
  imports: [CommonModule, AppMaterialModule, PipesModule],
  exports: APP_COMPONENTS,
  declarations: APP_COMPONENTS,
  providers: [UserService, NewsService]
})
export class AppSharedModule {}
