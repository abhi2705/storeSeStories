import { Component, OnInit, Input, Inject } from '@angular/core';
import { ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-brands-tab',
  templateUrl: './brands-tab.component.html',
  styleUrls: ['./brands-tab.component.scss']
})
export class BrandsTabComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @Input() active: boolean;
  // constructor() { }
  brands: any;

  constructor(@Inject(DOCUMENT) private document: Document, apiservice: ApiService) { 
    apiservice.brands.get().subscribe(response => 
    {
      this.brands = response.brands;
    });
    

  }

  ngOnInit(): void {
  }
  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
    }, 500);
  }
  toggle() {
    this.active = !this.active;
    console.log("brands: ",this.brands);
    return this.active;
  }
  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
}
