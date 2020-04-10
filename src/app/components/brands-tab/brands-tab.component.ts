import { Component, OnInit, Input, Inject } from '@angular/core';
import { ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { Brand, Brands } from 'src/app/models/brand.model';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-brands-tab',
  templateUrl: './brands-tab.component.html',
  styleUrls: ['./brands-tab.component.scss']
})
export class BrandsTabComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @Input() active: boolean;
  brands$: Observable<Brands>;

  constructor(private apiservice: ApiService) {}

  ngOnInit(): void {
    this.brands$ = this.apiservice.brands.get();
    this.brands$.subscribe((data: Brands) => console.log(data));
  }

  toggle() {
    this.active = !this.active;
    return this.active;
  }
  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
}
