import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bottom-menu',
  templateUrl: './bottom-menu.component.html',
  styleUrls: ['./bottom-menu.component.scss']
})
export class BottomMenuComponent implements OnInit {

  active: number;
  constructor() { }

  ngOnInit(): void {
    this.active = 1;
  }

  handleClick(target: number): void {
    // Do nothing if the target is currently active
    if (target === this.active) {
      return;
    }
    this.active = target;
    // TODO: Trigger page change here
  }

}
