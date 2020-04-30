import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Component framework imports
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IonicModule } from '@ionic/angular';
import { SwipeCardLibModule } from 'ng-swipe-card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { SlickCarouselModule } from 'ngx-slick-carousel';

// Component imports
import { AppComponent } from './app.component';
import { StoriesComponent } from './components/stories/stories.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ShareTabComponent } from './components/share-tab/share-tab.component';
import { UrlEncodePipe } from './pipes/url-encode.pipe';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { BrandNavComponent } from './components/brand-nav/brand-nav.component';
import { BlogNavComponent } from './components/blog-nav/blog-nav.component';
import { BlogPageComponent } from './components/blog-page/blog-page.component';
import { BottomMenuComponent } from './components/bottom-menu/bottom-menu.component';
import { StoriedBlogsComponent } from './components/storied-blogs/storied-blogs.component';
import { AccountPageComponent } from './components/account-page/account-page.component';
import { BoomarkedBlogsComponent } from './components/boomarked-blogs/boomarked-blogs.component'
import { LoginComponent } from './components/login/login.component';
import { BearerInterceptorService } from './services/bearer-interceptor.service';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderPageComponent } from './components/order-page/order-page.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

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
    BottomMenuComponent,
    StoriedBlogsComponent,
    AccountPageComponent,
    BoomarkedBlogsComponent,
    LoginComponent,
    MyOrdersComponent,
    OrderPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    IonicModule.forRoot(),
    SwipeCardLibModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule,
    SlickCarouselModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BearerInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ]
})
export class AppModule { }
