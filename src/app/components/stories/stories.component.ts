import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { ViewChild } from 'ngx-onsenui';
import { DOCUMENT } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';
import { Stories } from 'src/app/models/story.model';
import { ShareTabService } from 'src/app/services/share-tab.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss'],
})
export class StoriesComponent implements OnInit {
  @ViewChild('carousel') carousel;

  images = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => `../../../assets/sample_stories/ss${n}.jpg`);
  stories$: Observable<Stories>;
  constructor(@Inject(DOCUMENT) private document: Document,
              private apiservice: ApiService,
              private shareTabService: ShareTabService) {}

  ngOnInit(): void {
    this.stories$ = this.apiservice.stories.get();
    this.stories$.subscribe((data: Stories) => console.log(data));
  }

  // prev() {
  //   console.log("here prev");
  //   console.log(this.carousel);
  //   this.carousel.nativeElement.prev();
  // }
  // next() {
  //   console.log("here next");
  //   console.log(this.carousel);
  //   this.carousel.nativeElement.next();
  // }

  shop_now(story){
    this.document.location.href = story.targetUrl;
    // console.log("stories: ",this.stories);
  }

  get_duration(story){
    const date1 = new Date(story.postedAt);
    const date2 = new Date();
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    if (diffHours >= 24) {
      return '    ' + diffDays.toString() + ' d';
    }
    return '    ' + diffHours.toString() + ' h';
  }

  activateShare(brandUrl: string) {
    console.log('activating share');
    this.shareTabService.activate(brandUrl);
  }

}
