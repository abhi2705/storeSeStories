import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './components/home-page/home-page.component';
import { BrandNavComponent } from './components/brand-nav/brand-nav.component';
import { StoriesComponent } from './components/stories/stories.component';
import { BlogNavComponent } from './components/blog-nav/blog-nav.component';
import { BlogPageComponent } from './components/blog-page/blog-page.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { AccountPageComponent} from './components/account-page/account-page.component';
import { BoomarkedBlogsComponent } from './components/boomarked-blogs/boomarked-blogs.component';
import { BrandPageComponent } from './components/brand-page/brand-page.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderPageComponent } from './components/order-page/order-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      {
        path: '',
        redirectTo: 'feed',
        pathMatch: 'full',
      },
      {
        path: 'brands',
        component: BrandNavComponent
      },
      {
        path: 'brand/:id',
        component: BrandPageComponent
      },
      {
        path: 'feed',
        component: StoriesComponent
      },
      {
        path: 'blogs',
        component: BlogNavComponent
      },
      {
        path: 'blog/:id',
        component: BlogPageComponent
      },
      {
        path: 'liked',
        component: FavouritesComponent
      },
      {
        path : 'account',
        component : AccountPageComponent
      },
      {
        path : 'bookmarked',
        component : BoomarkedBlogsComponent
      },
      {
        path: 'my-orders',
        component: MyOrdersComponent
      },
      {
        path: 'order/:id',
        component: OrderPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
