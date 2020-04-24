
import {ShareTabService } from 'src/app/services/share-tab.service'
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Blogs } from 'src/app/models/blog.model';
import { BlogsService } from '../../services/blogs.service';
import { Subscription } from 'rxjs';
import { Comment } from 'src/app/models/comment.model'
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
  newComment : Comment;
   constructor(private apiservice: ApiService,
               private shareTabService: ShareTabService, 
               private route : ActivatedRoute,
               private bookmarkButtonService: BlogsService) {
                  this.isLiked=false;
                  this.isBookmarked=false;
               }
 
   ngOnInit(): void {
     this.newComment = {"commentId": 0, "content" : '', "sourceId" : 0,"userId" :0}
     this.blogId = this.route.snapshot.params['id']
     this.apiservice.blogs.get(this.blogId).subscribe((data: Blogs) => {
      this.blogpage = data;
      console.log(this.blogpage.title,this.blogpage.tags)
    });

    this.apiservice.blogs.isbookmarked(this.blogId).subscribe((data : Boolean)=> {
      this.isBookmarked = data;
    });

    this.apiservice.blogs.isliked(this.blogId).subscribe((data : Boolean)=> {
      this.isLiked = data;
    });

    this.getCommentCount();

    this.sub2 = this.bookmarkButtonService.boomkmarkEnabled.subscribe(enabled => this.favBtnEnabled = enabled);
    this.bookmarkButtonService.toggleBookmarkBtnView(true);

   }

   getCommentCount(){
    this.apiservice.blogs.getCommentsCount(this.blogId).subscribe((data : number)=> {
      this.comments = data;
    });

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
  getDayNumberSuffix(day : number) {
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

  getDate(){
    const date = new Date(this.blogpage.postedAt)
    let year = date.getFullYear();
    let month = date.toLocaleString('default', { month: 'short' })
    let day = date.getUTCDate();
    let suffix = this.getDayNumberSuffix(day)
    return day+suffix+" "+month+" "+year;
  }
  storecomment(x : any){
    console.log(x)
  }

  onEnter(comment: string) { 
    console.log(comment)
    this.newComment.content =  comment
    this.newComment.sourceId = this.blogId

    this.apiservice.blogs.addComment(this.newComment).subscribe((data : Comment)=> {
      console.log(data)
    });

    this.getCommentCount();
    
  }

  ngOnDestroy(): void {
    this.bookmarkButtonService.toggleBookmarkBtnView(false);
    this.sub2.unsubscribe();
  }

}
