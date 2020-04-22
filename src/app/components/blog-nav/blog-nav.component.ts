
import { Component, OnInit, Inject, Output, EventEmitter, ɵALLOW_MULTIPLE_PLATFORMS } from '@angular/core';
import {NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';
import { DOCUMENT } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';
import { Blogs, Blog } from 'src/app/models/blog.model';

@Component({
  selector: 'app-blog-nav',
  templateUrl: './blog-nav.component.html',
  styleUrls: ['./blog-nav.component.scss']
})
export class BlogNavComponent implements OnInit {
  sidebarIsActive = false;
  blogs$: Observable<Blogs>;
  constructor(@Inject(DOCUMENT) private document: Document,
              private apiservice: ApiService,
              config: NgbTabsetConfig) {}

  ngOnInit(): void {
    this.blogs$ = this.apiservice.blogs.getblogs();
    this.blogs$.subscribe((data: Blogs) => {
      console.log(data);
      var all_brands = data.blogs;
      var l = all_brands.length;
    });
  }

  selectedTab = "All";

  toggleSidebar(): boolean {
    this.sidebarIsActive = !this.sidebarIsActive;
    return this.sidebarIsActive;
  }

 


}
