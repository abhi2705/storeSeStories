import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OnsenModule } from 'ngx-onsenui';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoriesComponent } from './components/stories/stories.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ViewAllBrandsComponent } from './components/view-all-brands/view-all-brands.component';
import { ViewAllBrandsComponentSheet } from './components/view-all-brands/view-all-brands.component';

@NgModule({
  declarations: [
    AppComponent,
    StoriesComponent,
    SideBarComponent,
    HomePageComponent,
    NavBarComponent,
    ViewAllBrandsComponent,
    ViewAllBrandsComponentSheet
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    OnsenModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
]
})
export class AppModule { }
