import { Component, OnInit } from '@angular/core';
import {NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-brand-nav',
  templateUrl: './brand-nav.component.html',
  styleUrls: ['./brand-nav.component.scss']
})
export class BrandNavComponent implements OnInit {
  sidebarIsActive = false;
  constructor(config: NgbTabsetConfig) {
    
   }
  selectedTab = "All";

  ngOnInit(): void {
  }
  toggleSidebar(): boolean {
    this.sidebarIsActive = !this.sidebarIsActive;
    return this.sidebarIsActive;
  }
}
