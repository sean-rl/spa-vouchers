import { NewsService } from './../_shared/services/news.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewsRoutingModule } from './news-routing.module';
import { NewsPageComponent } from './page/news.component';
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
    NewsRoutingModule
  ],
  declarations: [NewsPageComponent],
  providers: [NewsService]
})
export class NewsModule {}
