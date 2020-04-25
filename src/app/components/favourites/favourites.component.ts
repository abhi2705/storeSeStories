
import { Component, OnInit, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Observable, Subscription } from 'rxjs';
import { Stories } from 'src/app/models/story.model';
import { DOCUMENT } from '@angular/common';
import { ShareTabService } from 'src/app/services/share-tab.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit, OnDestroy {

  stories$: Observable<Stories>;
  liked_stories = [];

  sidebarIsActive = false;

  source = "";
  target = "";
  time = "";

  liked = [];
  like = "";
  ind = 0;

  private sub: Subscription;

  constructor(@Inject(DOCUMENT) private document: Document, 
                                private apiservice: ApiService,
                                private shareTabService: ShareTabService,
                                private modalService: NgbModal,
                                private location: Location,
                                private shareTabService: ShareTabService) { }


  ngOnInit(): void {
    this.stories$ = this.apiservice.account.getLikedCards();
    this.sub = this.stories$.subscribe((data: Stories) => {
      console.log(data);
      this.liked_stories = data.stories;
      var l = this.liked_stories.length;
      var i = 0;
      for(i = 0; i < l; i++){
          this.liked.push("like_y");
      }
    });
  }

  toggleSidebar(): boolean {
    this.sidebarIsActive = !this.sidebarIsActive;
    return this.sidebarIsActive;
  }

  shop_now(targetUrl){
    this.document.getElementById("modal01").style.display = "block !important";
    this.document.location.href = targetUrl;
  }

  onClick(story, i) {
    this.source = story.imageUrl;
    this.target = story.targetUrl;
    this.time = this.get_duration(story);
    this.ind = i;
    this.like = this.liked[i];

    this.document.getElementById("modal01").style.display = "block";
  }

  get_duration(story){
    const date1 = new Date(story.postedAt);
    const date2 = new Date();
    const utc_date2 = new Date(date2.getTime() + date2.getTimezoneOffset() * 60000);
    const diffTime = Math.abs(utc_date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    if (diffHours >= 24) {
      return diffDays.toString() + ' d';
    }
    return diffHours.toString() + ' h';
  }

  activateShare(brandUrl: string) {
    console.log('activating share');
    this.shareTabService.activate(brandUrl);
    this.document.getElementById("modal01").style.display = "block !important";

  }

  remove_like(i){
    this.liked[i] = "like_n";
    this.document.getElementById("modal01").style.display = "block !important";
    location.reload();
    return;
  }

  back_to_list() {
    this.document.getElementById("modal01").style.display = "none";
  }
  goBack() {
    // window.history.back();
    this.location.back();

    console.log( 'goBack()...' );
  }
  // open(content) {
  //   // this.source = story.imageUrl;
  //   // this.target = story.targetUrl;
  //   // this.time = this.get_duration(story);
  //   // this.ind = i;
  //   // this.like = this.liked[i];
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     console.log(result);
  //   }, (reason) => {
  //     console.log(reason);
  //   });
  // }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}


