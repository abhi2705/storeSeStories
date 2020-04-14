import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand-nav',
  templateUrl: './brand-nav.component.html',
  styleUrls: ['./brand-nav.component.scss']
})
export class BrandNavComponent implements OnInit {
  sidebarIsActive = false;
  constructor() { }
  selectedTab = "All";

  ngOnInit(): void {
  }
  toggleSidebar(): boolean {
    this.sidebarIsActive = !this.sidebarIsActive;
    return this.sidebarIsActive;
  }
}
