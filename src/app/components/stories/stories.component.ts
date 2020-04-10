import { Component, OnInit, Inject } from '@angular/core';
import { ViewChild } from 'ngx-onsenui'
import { DOCUMENT } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';
import { Stories } from 'src/app/models/story.model';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit {
  @ViewChild('carousel') carousel;

  images = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => `../../../assets/sample_stories/ss${n}.jpg`);
  stories$: Observable<Stories>;

  constructor(@Inject(DOCUMENT) private document: Document, private apiservice: ApiService) {}

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
    console.log('shop now clicked!');
    console.log(story);
    this.document.location.href = story.targetUrl;
    // console.log("stories: ",this.stories);
  }

  get_duration(story){
    var date1 = new Date(story.postedAt);
    console.log(date1);
    var date2 = new Date();
    var diffTime = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    var diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    console.log(diffDays);
    console.log(diffHours);
    if (diffHours >= 24)
    return "    " + diffDays.toString() + " d";
    return "    " + diffHours.toString() + " h";
  }

} 
