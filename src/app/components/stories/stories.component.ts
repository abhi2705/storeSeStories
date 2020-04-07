import { Component, OnInit } from '@angular/core';
import { ViewChild } from 'ngx-onsenui'

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit {
  @ViewChild('carousel') carousel;

  images = [1055, 194, 368].map((n) => `https://picsum.photos/id/${n}/900/500`);

  constructor() { }

  ngOnInit(): void {
  }
  
  prev() {
    console.log("here prev");
    console.log(this.carousel);
    this.carousel.nativeElement.prev();
  }
  next() {
    console.log("here next");
    console.log(this.carousel);
    this.carousel.nativeElement.next();
  }

}
