import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';
import { Stories } from 'src/app/models/story.model';
import { DOCUMENT } from '@angular/common';
import { ShareTabService } from 'src/app/services/share-tab.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {

  stories$: Observable<Stories>;

  sidebarIsActive = false;

  source = "";
  target = "";
  time = ""

  liked = [];
  like = ""
  ind = 0;

  constructor(@Inject(DOCUMENT) private document: Document, 
                                private apiservice: ApiService,
                                private shareTabService: ShareTabService,
                                private modalService: NgbModal) { }

  ngOnInit(): void {
    this.stories$ = this.apiservice.stories.get();
    this.stories$.subscribe((data: Stories) => {
      console.log(data);
      var all_stories = data.stories;
      var l = all_stories.length;
      var i = 0;
      for(i = 0; i < l; i++){
        // if(all_stories[i].isLiked == true)
          this.liked.push("like_y");
        // else
        //   this.liked.push("like_n");
      }
    });
  }

  toggleSidebar(): boolean {
    this.sidebarIsActive = !this.sidebarIsActive;
    return this.sidebarIsActive;
  }

  shop_now(targetUrl){
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
    this.document.getElementById("modal01").style.display = "block";

  }

  remove_like(i){
    this.liked[i] = "like_n";
    this.document.getElementById("modal01").style.display = "none";
    return;
  }

  back_to_list() {
    this.document.getElementById("modal01").style.display = "none";
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

}
