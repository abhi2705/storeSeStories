import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';
import { Stories } from 'src/app/models/story.model';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {

  stories$: Observable<Stories>;

  sidebarIsActive = false;

  source = "";
  target = "";

  constructor(@Inject(DOCUMENT) private document: Document, 
                                private apiservice: ApiService) { }

  ngOnInit(): void {
    this.stories$ = this.apiservice.stories.get();
    this.stories$.subscribe((data: Stories) => {
      console.log(data);
    });
  }

  toggleSidebar(): boolean {
    this.sidebarIsActive = !this.sidebarIsActive;
    return this.sidebarIsActive;
  }

  shop_now(targetUrl){
    this.document.location.href = targetUrl;
  }

  onClick(story) {
    this.source = story.imageUrl;
    this.target = story.targetUrl;
    this.document.getElementById("modal01").style.display = "block";
  }

}
