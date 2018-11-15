import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MarkdownModule } from 'ngx-markdown';
import { AppSharedModule } from './_shared/app.shared.module';
import { PipesModule } from './_shared/pipes/pipes.module';
import { SearchService } from './_shared/services/search.service';
import { UserService } from './_shared/services/user.service';
import { AppComponent } from './app.component';
import { AppMaterialModule } from './app.material.module';
import { AppRoutingModule } from './app.routing';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    MarkdownModule.forRoot(),
    PipesModule,
    AppSharedModule,
    AppRoutingModule
  ],
  providers: [SearchService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule {}
