import { Component, OnInit, Inject } from '@angular/core';
import { ViewChild } from 'ngx-onsenui'
import { DOCUMENT } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit {
  @ViewChild('carousel') carousel;

  images = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => `../../../assets/sample_stories/ss${n}.jpg`);

  stories: any;

  constructor(@Inject(DOCUMENT) private document: Document, apiservice: ApiService) { 
    apiservice.stories.get().subscribe(response => 
    {
      this.stories = response.stories;
    });
    console.log("stories: ",this.stories);

  }

  ngOnInit(): void {
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

  shop_now(image){
    console.log("shop now clicked!");
    console.log(image);
    // this.document.location.href = 'https://www.instagram.com/p/B-pFyz6BQax/' ;
    console.log("stories: ",this.stories);
  }

}
