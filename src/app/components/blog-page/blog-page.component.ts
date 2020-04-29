
import { Location } from '@angular/common';
import {ShareTabService } from 'src/app/services/share-tab.service'
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Blogs, Blog } from 'src/app/models/blog.model';
import { BlogsService } from '../../services/blogs.service';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
import { Comment } from 'src/app/models/comment.model'
@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent implements OnInit, OnDestroy {

  destroySubject$: Subject<void> = new Subject();
  isLiked: Boolean;
  isBookmarked: Boolean;
  blogId: number;
  comments: number;
  private sub2: Subscription;
  favBtnEnabled: boolean;
  private sub: Subscription;
  blogpage : any;
  newComment: Comment;
  recommendedBlogs: Array<Blog>;
   constructor(private apiservice: ApiService,
               private shareTabService: ShareTabService, 
               private route : ActivatedRoute,
               private location: Location,
               private bookmarkButtonService: BlogsService) {
                  
               }
    ngOnInit() : void{
        this.sub = this.route.params.subscribe(routeParams => {
        this.fetchData(routeParams.id);
    });
    }
    
 
   fetchData(id): void {
    this.recommendedBlogs = []
    this.blogpage = []
     this.newComment = { "commentId": 0, "content": '', "sourceId": 0, "userId": 0 }
     this.blogId = id
     this.apiservice.blogs.get(this.blogId).subscribe((data: Blog) => {
      this.blogpage = data;
      if(this.blogpage.isLiked==true){
        this.isLiked = true
      }
      else{
        this.isLiked=false
      }
      if(this.blogpage.isBookmarked==true){
        this.isBookmarked = true
      }
      else{
        this.isBookmarked = false
      }
    });

  

    this.getCommentCount();

    this.apiservice.blogs.get().pipe(takeUntil(this.destroySubject$)).subscribe((data: Blogs) => {
      for (let i in data.blogs) {

        if (data.blogs[i].blogId != this.blogId)
          this.recommendedBlogs.push(data.blogs[i])
        if (this.recommendedBlogs.length == 2)
          break
      }
    })

    this.sub2 = this.bookmarkButtonService.boomkmarkEnabled.subscribe(enabled => this.favBtnEnabled = enabled);
    this.bookmarkButtonService.toggleBookmarkBtnView(true);
  }

  getCommentCount() {
    this.apiservice.blogs.getCommentsCount(this.blogId).pipe(takeUntil(this.destroySubject$)).subscribe((data: number) => {
      this.comments = data;
    });

  }

  activateShare() {
    this.shareTabService.activate(window.location.href);
  }

  bookmarkPage() {
    if (this.isBookmarked == false) {
      this.apiservice.blogs.bookmark(this.blogId).pipe(takeUntil(this.destroySubject$)).subscribe((data: Boolean) => {
        this.isBookmarked = data
      });
    }
    else {
      this.apiservice.blogs.unbookmark(this.blogId).pipe(takeUntil(this.destroySubject$)).subscribe((data: Boolean) => {
        this.isBookmarked = data
      });
    }
  }

  likePage() {
    if (this.isLiked == false) {
      this.apiservice.blogs.like(this.blogId).pipe(takeUntil(this.destroySubject$)).subscribe((data: Boolean) => {
        this.isLiked = data
      });
    }
    else {
      this.apiservice.blogs.unlike(this.blogId).pipe(takeUntil(this.destroySubject$)).subscribe((data: Boolean) => {
        this.isLiked = data
      });

    }
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



  onEnter(comment: string) {
    this.newComment.content = comment
    this.newComment.sourceId = this.blogId

    this.apiservice.blogs.addComment(this.newComment).pipe(takeUntil(this.destroySubject$)).subscribe((data: Comment) => { });

    this.getCommentCount();

  }

  ngOnDestroy(): void {
    this.bookmarkButtonService.toggleBookmarkBtnView(false);
    this.sub2.unsubscribe();
    this.destroySubject$.next();
    this.destroySubject$.unsubscribe();
    this.sub.unsubscribe();
  }
  goBack() {
    this.location.back();
  }

}
