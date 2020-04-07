import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  @Input() active: boolean;

  constructor() { }

  ngOnInit(): void { }

  collapse() {
    this.active = false;
  }
}
