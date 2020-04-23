
import {ShareTabService } from 'src/app/services/share-tab.service'
import { Router, ActivatedRoute } from '@angular/router';

import { Component, OnInit, Inject, Output, EventEmitter, ɵALLOW_MULTIPLE_PLATFORMS } from '@angular/core';
import {NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';
import { DOCUMENT } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Blogs, Blog } from 'src/app/models/blog.model';
@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent implements OnInit {

 
  isLiked : Boolean;
  isBookmarked : Boolean;
  blogId : number;
  comments : number;


  
   blogpage : any;
   constructor(@Inject(DOCUMENT) private document: Document,
               private apiservice: ApiService,
               config: NgbTabsetConfig,
               private shareTabService: ShareTabService, private router : Router,
               private route : ActivatedRoute) {
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

}
