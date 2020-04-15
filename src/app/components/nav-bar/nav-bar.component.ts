import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  readonly logoImg = 'assets/img/logos/Storese_branding-01.png';

  constructor() { }

  ngOnInit(): void {
  }
}
