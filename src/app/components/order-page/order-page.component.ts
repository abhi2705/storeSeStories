import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Observable } from 'rxjs';
import { Order } from '../../models/order.model';
import {ActivatedRoute} from '@angular/router';
import { ShopifyService } from 'src/app/services/shopify.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit {

  order$: Observable<Order>;
  private productCache: any;
  constructor(private api: ApiService, private route: ActivatedRoute, private _shopify: ShopifyService, private location: Location) { }

  ngOnInit(): void {
    console.log('initing')
    this.order$ = this.api.account.getOrder(this.route.snapshot.params.id);
    this.productCache = {};
  }

  get shopify() {
    return this._shopify;
  }

  getProduct(id: string): Observable<any> {
    if (!this.productCache[id]) {
      this.productCache[id] = this._shopify.getProductById(id);
    }
    return this.productCache[id];
  }
  goBack() {
    this.location.back();
    console.log( 'goBack()...' );
  }
}
