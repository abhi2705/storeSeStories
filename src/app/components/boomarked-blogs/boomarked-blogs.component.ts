import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-boomarked-blogs',
  templateUrl: './boomarked-blogs.component.html',
  styleUrls: ['./boomarked-blogs.component.scss']
})
export class BoomarkedBlogsComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }
  goBack() {
    // window.history.back();
    this.location.back();

    console.log( 'goBack()...' );
  }

}
