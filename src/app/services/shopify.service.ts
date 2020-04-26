import { Injectable } from '@angular/core';
import Client from 'shopify-buy';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopifyService {

  private shopifyClient: Client;
  constructor() {
    this.shopifyClient = Client.buildClient({
      domain: 'more-storese.myshopify.com',
      storefrontAccessToken: '157d47b99cc1af367ce12e227d2ca751'
    });
  }

  getProductById(id: string): Observable<any> {
    id = btoa(`gid://shopify/Product/${id}`);
    const ret = new Subject<any>();
    this.shopifyClient.product.fetch(id)
    .then(pdt => ret.next(pdt))
    .catch(err => ret.error(err));
    return ret.asObservable();
  }
}
