import { Component, OnInit, Input } from '@angular/core';
import { ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
@Component({
  selector: 'app-brands-tab',
  templateUrl: './brands-tab.component.html',
  styleUrls: ['./brands-tab.component.scss']
})
export class BrandsTabComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @Input() active: boolean;
  constructor() { }

  ngOnInit(): void {
  }
  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      // if (data.length == 1000) {
      //   event.target.disabled = true;
      // }
    }, 500);
  }
  toggle() {
    this.active = !this.active;
    return this.active;
  }
  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
}
