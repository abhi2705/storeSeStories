import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './components/home-page/home-page.component';
import { FavouritesComponent } from './components/favourites/favourites.component';

const routes: Routes = [ {
  path: '',
  component: HomePageComponent
},
{
  path: 'likes',
  component: FavouritesComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
