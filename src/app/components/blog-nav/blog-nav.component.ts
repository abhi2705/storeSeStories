
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';
import { Blogs, Blog } from 'src/app/models/blog.model';

@Component({
  selector: 'app-blog-nav',
  templateUrl: './blog-nav.component.html',
  styleUrls: ['./blog-nav.component.scss']
})
export class BlogNavComponent implements OnInit {
  blogs$: Observable<Blogs | Blog>;
  constructor(private apiservice: ApiService) {}

  ngOnInit(): void {
    this.blogs$ = this.apiservice.blogs.get();
  }
}
