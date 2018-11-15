import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VenuePageComponent } from './page/venue.component';

const routes: Routes = [{
  path: ':venueDash/:packageId',
  component: VenuePageComponent,
},
{
  path: ':venueDash',
  component: VenuePageComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VenueRoutingModule { }
