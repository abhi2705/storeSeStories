
import { Location } from '@angular/common';
import { Blogs } from 'src/app/models/blog.model';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-boomarked-blogs',
  templateUrl: './boomarked-blogs.component.html',
  styleUrls: ['./boomarked-blogs.component.scss']
})
export class BoomarkedBlogsComponent implements OnInit {

  blogs$: Observable<Blogs>;
  constructor(private location: Location,
             private apiservice: ApiService) { }


  ngOnInit(): void {
    this.blogs$ = this.apiservice.account.getBookmarked();
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

  getDate(blog){
    const date = new Date(blog.postedAt)
    let year = date.getFullYear();
    let month = date.toLocaleString('default', { month: 'short' })
    let day = date.getUTCDate();
    let suffix = this.getDayNumberSuffix(day)
    return day+suffix+" "+month+" "+year;
  }
  goBack() {
    // window.history.back();
    this.location.back();

    console.log( 'goBack()...' );
  }


}
