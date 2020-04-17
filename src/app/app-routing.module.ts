import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './components/home-page/home-page.component';
import { BrandNavComponent } from './components/brand-nav/brand-nav.component';
import { StoriesComponent } from './components/stories/stories.component';
import { BlogNavComponent } from './components/blog-nav/blog-nav.component';
import { BlogPageComponent } from './components/blog-page/blog-page.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { AccountPageComponent} from './components/account-page/account-page.component'
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
        path: 'account',
        component: FavouritesComponent
      },
      {
        path : 'account-page',
        component : AccountPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
