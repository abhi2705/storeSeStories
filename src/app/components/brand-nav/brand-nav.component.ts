import { Component, OnInit, Inject, Output, EventEmitter, ɵALLOW_MULTIPLE_PLATFORMS } from '@angular/core';
import {NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';
import { DOCUMENT } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';
import { Brands } from 'src/app/models/brand.model';

@Component({
  selector: 'app-brand-nav',
  templateUrl: './brand-nav.component.html',
  styleUrls: ['./brand-nav.component.scss']
})
export class BrandNavComponent implements OnInit {
  sidebarIsActive = false;
  brands$: Observable<Brands>;
  constructor(@Inject(DOCUMENT) private document: Document,
              private apiservice: ApiService,
              config: NgbTabsetConfig) {}

  ngOnInit(): void {
    this.brands$ = this.apiservice.brands.get();
    this.brands$.subscribe((data: Brands) => {
      console.log(data);
      var all_brands = data.brands;
      var l = all_brands.length;
    });
  }

  selectedTab = "All";

  toggleSidebar(): boolean {
    this.sidebarIsActive = !this.sidebarIsActive;
    return this.sidebarIsActive;
  }
}



// import { Component, OnInit, Inject, Output, EventEmitter, ɵALLOW_MULTIPLE_PLATFORMS } from '@angular/core';
// import { ViewChild } from 'ngx-onsenui';
// import { DOCUMENT } from '@angular/common';
// import { ApiService } from '../../services/api.service';
// import { Observable } from 'rxjs';
// import { Stories } from 'src/app/models/story.model';
// import { ShareTabService } from 'src/app/services/share-tab.service';

// @Component({
//   selector: 'app-stories',
//   templateUrl: './stories.component.html',
//   styleUrls: ['./stories.component.scss'],
// })
// export class StoriesComponent implements OnInit {

//   favourite_stories = [];
//   liked = [];
//   active = [];

//   images = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => `../../../assets/sample_stories/ss${n}.jpg`);
//   stories$: Observable<Stories>;
//   constructor(@Inject(DOCUMENT) private document: Document,
//               private apiservice: ApiService,
//               private shareTabService: ShareTabService) {}

//   ngOnInit(): void {
//     this.stories$ = this.apiservice.stories.get();
//     this.stories$.subscribe((data: Stories) => {
//       console.log(data);
//       var all_stories = data.stories;
//       var l = all_stories.length;
//       var i = 0;
//       for(i = 0; i < l; i++){
//         this.liked.push("like_n");
//         this.active.push("dot");
//       }
//       this.active[0] = "dot_active";
//     });
//   }

// }
