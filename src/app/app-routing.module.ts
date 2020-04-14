import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './components/home-page/home-page.component';
import { BrandNavComponent } from './components/brand-nav/brand-nav.component';
import { BlogNavComponent } from './components/blog-nav/blog-nav.component';
import { BlogPageComponent } from './components/blog-page/blog-page.component'
const routes: Routes = [
  {
    path: 'blog-page',
    component: BlogPageComponent
  },
  {
    path: 'blogs',
    component: BlogNavComponent
  },
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
