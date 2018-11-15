import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './page/home.component';
import { AppSharedModule } from '../_shared/app.shared.module';
import { PipesModule } from '../_shared/pipes/pipes.module';
import { NewsService } from '../_shared/services/news.service';
import { AppMaterialModule } from '../app.material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    PipesModule,
    AppSharedModule,
    HomeRoutingModule
  ],
  declarations: [HomePageComponent],
  providers: [NewsService]
})
export class HomeModule {}
