import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SlideshowModule } from 'ng-simple-slideshow';
import { MarkdownModule } from 'ngx-markdown';
import { PipesModule } from './../_shared/pipes/pipes.module';
import { UserService } from './../_shared/services/user.service';
import { VenueBookingDaysService } from '../_shared/services/booking-days.service';
import { VenueBookingComponent } from './booking/booking.component';
import { VenueBookingCalendarComponent } from './booking/calendar/calendar.component';
import { VenueBookingDetailComponent } from './booking/detail/detail.component';
import { VenueBookingPackageComponent } from './booking/package/package.component';
import { VenueHighlightComponent } from './highlight/highlight.component';
import { VenueInfoComponent } from './info/info.component';
import { VenuePackageComponent } from './package/package.component';
import { VenuePageComponent } from './page/venue.component';
import { VenueContentService } from '../_shared/services/venue-content.service';
import { VenuePackageService } from '../_shared/services/venue-package.service';
import { VenueRoutingModule } from './venue-routing.module';
import { AppSharedModule } from '../_shared/app.shared.module';
import { AppMaterialModule } from '../app.material.module';

const VENUE_COMPONENTS = [
  VenueInfoComponent,
  VenueHighlightComponent,
  VenuePackageComponent,
  VenueBookingPackageComponent,
  VenueBookingCalendarComponent,
  VenueBookingDetailComponent,
  VenueBookingComponent,
  VenuePageComponent
];

@NgModule({
  imports: [
    CommonModule,
    AngularFireAuthModule,
    RouterModule,
    MarkdownModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    PipesModule,
    AppSharedModule,
    SlideshowModule,
    VenueRoutingModule
  ],
  declarations: VENUE_COMPONENTS,
  providers: [VenueContentService, VenuePackageService, VenueBookingDaysService, UserService]
})
export class VenueModule {}
