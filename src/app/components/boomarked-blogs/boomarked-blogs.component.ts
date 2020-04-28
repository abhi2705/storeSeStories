
import { Location } from '@angular/common';
import { Blogs, Blog } from 'src/app/models/blog.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-boomarked-blogs',
  templateUrl: './boomarked-blogs.component.html',
  styleUrls: ['./boomarked-blogs.component.scss']
})
export class BoomarkedBlogsComponent implements OnInit, OnDestroy {

  blogs$: Observable<Blogs | Blog>;
  sub: Subscription;
  searchText: string;
  allBlogs: Blog[];

  constructor(private location: Location,
              private apiservice: ApiService) { }


  ngOnInit(): void {
    this.blogs$ = this.apiservice.blogs.get();
    this.sub = this.blogs$.subscribe((data: Blogs) => {
      this.allBlogs = data.blogs;
    });
  }

  getDayNumberSuffix(day: number) {
    if (day >= 11 && day <= 13) {
        return 'th';
    }
    switch (day % 10) {
    case 1:
        return 'st';
    case 2:
        return 'nd';
    case 3:
        return 'rd';
    default:
        return 'th';
    }
}

  getDate(blog){
    const date = new Date(blog.postedAt);
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getUTCDate();
    const suffix = this.getDayNumberSuffix(day);
    return day + suffix + ' ' + month + ' ' + year;
  }
  goBack() {
    // window.history.back();
    this.location.back();

    console.log( 'goBack()...' );
  }
  ngOnDestroy(){
      this.sub.unsubscribe();
  }


}
