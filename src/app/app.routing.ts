import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'account',
    loadChildren: './account/account.module#AccountModule'
  },
  {
    path: 'news',
    loadChildren: './news/news.module#NewsModule'
  },
  {
    path: 'search',
    loadChildren: './search/search.module#SearchModule'
  },
  {
    path: 'shop',
    loadChildren: './shop/shop.module#ShopModule'
  },
  {
    path: 'venue',
    loadChildren: './venue/venue.module#VenueModule'
  },
  {
    path: '**',
    loadChildren: './home/home.module#HomeModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
