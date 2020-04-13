import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './components/home-page/home-page.component';
import { BrandNavComponent } from './components/brand-nav/brand-nav.component';
const routes: Routes = [
  {
    path: 'brands',
    component: BrandNavComponent
  },
  {
  path: '',
  component: HomePageComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
