import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-brands-tab',
  templateUrl: './brands-tab.component.html',
  styleUrls: ['./brands-tab.component.scss']
})
export class BrandsTabComponent implements OnInit {

  @Input() active: boolean;
  constructor() { }

  ngOnInit(): void {
  }

  toggle() {
    this.active = !this.active;
    return this.active;
  }
}
