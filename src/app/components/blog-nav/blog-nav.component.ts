
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Observable, Subscription } from 'rxjs';
import { Blogs, Blog } from 'src/app/models/blog.model';
import { BlogsService } from '../../services/blogs.service';


@Component({
  selector: 'app-blog-nav',
  templateUrl: './blog-nav.component.html',
  styleUrls: ['./blog-nav.component.scss']
})
export class BlogNavComponent implements OnInit, OnDestroy {
  blogs$: Observable<Blogs | Blog>;
  private sub2: Subscription;
  private sub: Subscription;
  favBtnEnabled: boolean;
  allBlogs: any;
  searchText: any;
  constructor(private apiservice: ApiService,
    private bookmarkButtonService: BlogsService) { }

  ngOnInit(): void {
    this.blogs$ = this.apiservice.blogs.get();
    this.sub=this.blogs$.subscribe((data: Blogs) => {
      this.allBlogs=data.blogs;
    });
    this.sub2 = this.bookmarkButtonService.boomkmarkEnabled.subscribe(enabled => this.favBtnEnabled = enabled);
    this.bookmarkButtonService.toggleBookmarkBtnView(true);
  }

  getDayNumberSuffix(day: number) {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  getDate(blog) {
    const date = new Date(blog.postedAt)
    let year = date.getFullYear();
    let month = date.toLocaleString('default', { month: 'short' })
    let day = date.getUTCDate();
    let suffix = this.getDayNumberSuffix(day)
    return day + suffix + " " + month + " " + year;
  }

  ngOnDestroy(): void {
    this.bookmarkButtonService.toggleBookmarkBtnView(false);
    this.sub2.unsubscribe();
    this.sub.unsubscribe();
  }
}
