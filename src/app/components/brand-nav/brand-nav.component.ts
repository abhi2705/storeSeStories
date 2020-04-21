import { Component, OnInit, Inject, Output, EventEmitter, ɵALLOW_MULTIPLE_PLATFORMS } from '@angular/core';
import {NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';
import { DOCUMENT } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Observable, Subscription } from 'rxjs';
import { Brands, Brand } from 'src/app/models/brand.model';

@Component({
  selector: 'app-brand-nav',
  templateUrl: './brand-nav.component.html',
  styleUrls: ['./brand-nav.component.scss']
})
export class BrandNavComponent implements OnInit {
  sidebarIsActive = false;
  brands$: Observable<Brands | Brand>;
  private sub: Subscription;
  constructor(@Inject(DOCUMENT) private document: Document,
              private apiservice: ApiService,
              config: NgbTabsetConfig) {}

  ngOnInit(): void {
    this.brands$ = this.apiservice.brands.get();
    this.sub=this.brands$.subscribe((data: Brands) => {
      console.log(data);
    });
  }

  selectedTab = "All";

  toggleSidebar(): boolean {
    this.sidebarIsActive = !this.sidebarIsActive;
    return this.sidebarIsActive;
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}