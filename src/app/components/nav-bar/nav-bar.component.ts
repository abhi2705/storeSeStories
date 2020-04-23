import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FavButtonService } from '../../services/fav-button.service';
import { BlogsService } from '../../services/blogs.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  readonly logoImg = 'assets/img/logos/Storese_branding-01.png';

  fav_btn_enabled: boolean;
  bookmark_btn_enabled: boolean;
  private sub: Subscription;
  private bookmarkSub: Subscription

  constructor(private favBtnService: FavButtonService, private bookmarkBtnService : BlogsService) { }

  ngOnInit(): void {
    this.sub = this.favBtnService.favEnabled.subscribe(enabled => this.fav_btn_enabled = enabled);
    this.bookmarkSub = this.bookmarkBtnService.boomkmarkEnabled.subscribe(enabled => this.bookmark_btn_enabled = enabled);
    console.log(this.fav_btn_enabled,this.bookmark_btn_enabled)
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.bookmarkSub.unsubscribe();
  }
}
