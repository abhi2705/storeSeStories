import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

// Component framework imports
import {MatTabsModule} from '@angular/material/tabs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OnsenModule } from 'ngx-onsenui';
import { IonicModule } from '@ionic/angular';

// Component imports
import { AppComponent } from './app.component';
import { StoriesComponent } from './components/stories/stories.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ShareTabComponent } from './components/share-tab/share-tab.component';
import { UrlEncodePipe } from './pipes/url-encode.pipe';
import { HammerGestureConfig } from '@angular/platform-browser';
import * as hammer from 'hammerjs';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { BrandNavComponent } from './components/brand-nav/brand-nav.component';
import { BlogNavComponent } from './components/blog-nav/blog-nav.component';
import { BlogPageComponent } from './components/blog-page/blog-page.component';
import { BottomMenuComponent } from './components/bottom-menu/bottom-menu.component';

export class MyHammerConfig extends HammerGestureConfig {
  overrides = {
    swipe: { direction: hammer.DIRECTION_VERTICAL },
    pinch: { enable: false },
    rotate: { enable: false }
  } as any;
}




@NgModule({
  declarations: [
    AppComponent,
    StoriesComponent,
    SideBarComponent,
    HomePageComponent,
    NavBarComponent,
    ShareTabComponent,
    UrlEncodePipe,
    FavouritesComponent,
    BrandNavComponent,
    BlogNavComponent,
    BlogPageComponent,
    BottomMenuComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    OnsenModule,
    IonicModule.forRoot(),
    MatTabsModule
  ],
  providers: [{
    provide: HAMMER_GESTURE_CONFIG,
    useClass: MyHammerConfig
  },BookmarksService],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ]
})
export class AppModule { }
