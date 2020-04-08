import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

// Component framework imports
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OnsenModule } from 'ngx-onsenui';

// Component imports
import { AppComponent } from './app.component';
import { StoriesComponent } from './components/stories/stories.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { BrandsTabComponent } from './components/brands-tab/brands-tab.component';

@NgModule({
  declarations: [
    AppComponent,
    StoriesComponent,
    SideBarComponent,
    HomePageComponent,
    NavBarComponent,
    BrandsTabComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
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
