
import {ShareTabService } from 'src/app/services/share-tab.service'
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Blogs } from 'src/app/models/blog.model';
import { BlogsService } from '../../services/blogs.service';
import { Subscription, Observable } from 'rxjs';
@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent implements OnInit, OnDestroy {

 
  isLiked : Boolean;
  isBookmarked : Boolean;
  blogId : number;
  comments : number;
  private sub2: Subscription;
  favBtnEnabled: boolean;
  blogpage : any;
   constructor(private apiservice: ApiService,
               private shareTabService: ShareTabService, 
               private route : ActivatedRoute,
               private bookmarkButtonService: BlogsService) {
                  this.isLiked=false;
                  this.isBookmarked=false;
               }
 
   ngOnInit(): void {
     this.blogId = this.route.snapshot.params['id']
     this.apiservice.blogs.get(this.blogId).subscribe((data: Blogs) => {
      this.blogpage = data;
    });

    this.apiservice.blogs.isbookmarked(this.blogId).subscribe((data : Boolean)=> {
      this.isBookmarked = data;
    });

    this.apiservice.blogs.isliked(this.blogId).subscribe((data : Boolean)=> {
      this.isLiked = data;
    });

    this.apiservice.blogs.getCommentsCount(this.blogId).subscribe((data : number)=> {
      this.comments = data;
    });

    this.sub2 = this.bookmarkButtonService.boomkmarkEnabled.subscribe(enabled => this.favBtnEnabled = enabled);
    this.bookmarkButtonService.toggleBookmarkBtnView(true);

   }

  activateShare() {
    this.shareTabService.activate(window.location.href);
  }

  bookmarkPage(){
    if(this.isBookmarked==false){
      this.apiservice.blogs.bookmark(this.blogId).subscribe((data : Boolean)=> {
        this.isBookmarked = data
      });
    }
    else{
      this.apiservice.blogs.unbookmark(this.blogId).subscribe((data : Boolean)=> {
        this.isBookmarked = data
      });
    }
  }

  likePage(){
    if(this.isLiked==false){
      this.apiservice.blogs.like(this.blogId).subscribe((data : Boolean)=> {
        this.isLiked = data
      });
    }
    else{
      this.apiservice.blogs.unlike(this.blogId).subscribe((data : Boolean)=> {
        this.isLiked = data
      });
   
    }
  }

  ngOnDestroy(): void {
    this.bookmarkButtonService.toggleBookmarkBtnView(false);
    this.sub2.unsubscribe();
  }

}
