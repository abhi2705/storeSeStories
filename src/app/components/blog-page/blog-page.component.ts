import { Component, OnInit } from '@angular/core';
import {ShareTabService } from 'src/app/services/share-tab.service'
import {BlogsService } from 'src/app/services/blogs.service'
@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent implements OnInit {

  currentBlog : any;
  likedBlogs : Array<any>;
  isLiked : boolean;
  bookmarkedBlogs : Array<any>;
  isBookmarked : boolean;
  brandUrl : string;

  constructor(private shareTabService: ShareTabService, private blogService : BlogsService, ) {
    this.likedBlogs=this.blogService.likedBlogs;
    this.bookmarkedBlogs=this.blogService.bookmarkedBlogs;
    this.isLiked=false;
    this.isBookmarked=false;
   }

  ngOnInit(): void {
    this.currentBlog={
      "img" : "",
      "title" : ""
    }

  }

  activateShare() {
    this.brandUrl='www.google.com'
    console.log('activating share');
    this.shareTabService.activate(this.brandUrl);
  }

  bookmarkPage(currentBlog){
    if(this.isBookmarked==false){
      this.blogService.bookmarkedBlogs.push(currentBlog);
      this.isBookmarked=true;
    }
    else{
      for( var i = 0; i < this.blogService.bookmarkedBlogs.length; i++){
         if (this.blogService.bookmarkedBlogs[i] === currentBlog) {
          this.blogService.bookmarkedBlogs.splice(i, 1);
         }
        }
      this.isBookmarked=false;
    }
  }

  likePage(currentBlog){
    if(this.isLiked==false){
      this.blogService.likedBlogs.push(currentBlog);
      this.isLiked=true;
    }
    else{
      for( var i = 0; i < this.blogService.likedBlogs.length; i++){
         if (this.blogService.likedBlogs[i] === currentBlog) {
          this.blogService.likedBlogs.splice(i, 1);
         }
        }
      this.isLiked=false;
    }
  }

}
