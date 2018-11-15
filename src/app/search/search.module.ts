import { SearchRoutingModule } from './search-routing.module';
import { SearchService } from './../_shared/services/search.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from './../app.material.module';
import { SearchInputComponent } from './input/input.component';
import { SearchPageComponent } from './page/search.component';
import { SearchResultsComponent } from './results/results.component';
import { AppSharedModule } from '../_shared/app.shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    AppSharedModule,
    SearchRoutingModule
  ],
  declarations: [
    SearchPageComponent,
    SearchInputComponent,
    SearchResultsComponent
  ],
  providers: [SearchService]
})
export class SearchModule {}
