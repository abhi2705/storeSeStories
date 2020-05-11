import { Injectable } from '@angular/core';
import Client from 'shopify-buy';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

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

  private obv$ = new Observable<any>();

  private getEncodedId(id: string, resource: string) {
    return btoa(`gid://shopify/${resource}/${id}`);
  }

  getProductById(id: string): Observable<any> {
    return new Observable<any>(subs => {
      this.shopifyClient.product.fetch(this.getEncodedId(id, 'Product'))
    .then(pdt => { subs.next(pdt); subs.complete(); })
    .catch(err => { subs.error(err); subs.complete(); });
    });
  }

  getCollectionById(id: string): Observable<any> {
    return new Observable<any>(subs => {
      this.shopifyClient.collection.fetchWithProducts(this.getEncodedId(id, 'Collection'))
      .then(coll => { subs.next(coll); subs.complete(); })
      .catch(err => { subs.error(err); subs.complete(); });
    });
  }

  createCheckout(): Observable<any> {
    return new Observable<any>(subs => {
      this.shopifyClient.checkout.create()
      .then(checkout => { subs.next(checkout); subs.complete(); })
      .catch(err => { subs.error(err); subs.complete(); });
    });
  }

  getCheckout(id: string): Observable<any> {
    return new Observable<any>(subs => {
      this.shopifyClient.checkout.fetch(id)
      .then(checkout => { subs.next(checkout); subs.complete(); })
      .catch(err => { subs.error(err); subs.complete(); });
    });
  }

  updateCheckout(id: string, input: any): Observable<any> {
    return new Observable<any>(subs => {
      this.shopifyClient.checkout.updateAttributes()
      .then(checkout => { subs.next(checkout); subs.complete(); })
      .catch(err => { subs.error(err); subs.complete(); });
    });
  }

  addLineItems(checkoutId: string, lineItems: any[]): Observable<any> {
    return new Observable<any>(subs => {
      this.shopifyClient.checkout.addLineItems(checkoutId, lineItems)
      .then(checkout => { subs.next(checkout); subs.complete(); })
      .catch(err => { subs.error(err); subs.complete(); });
    });
  }

  updateLineItems(checkoutId: string, updLineItems: any[]): Observable<any> {
    return new Observable<any>(subs => {
      this.shopifyClient.updateLineItems(checkoutId, updLineItems)
      .then(checkout => { subs.next(checkout); subs.complete(); })
      .catch(err => { subs.error(err); subs.complete(); });
    });
  }

  removeLineItems(checkoutId: string, rmLineItems: any[]): Observable<any> {
    return new Observable<any>(subs => {
      this.shopifyClient.removeLineItems(checkoutId, rmLineItems)
      .then(checkout => { subs.next(checkout); subs.complete(); })
      .catch(err => { subs.error(err); subs.complete(); });
    });
  }
}
