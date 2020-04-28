import { HttpClient } from '@angular/common/http';
import { BaseApi } from './base.api';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Blogs } from '../models/blog.model'
import { User } from '../models/user.model'
import { Orders, Order } from '../models/order.model';
import { Stories } from '../models';


export class AccountApi extends BaseApi {
  private endpointUrl: string;
  constructor(endpoint: string, baseUrl: string, http: HttpClient) {
    super(baseUrl, http);
    this.endpointUrl = this.baseUrl + endpoint;
  }

  getBookmarked(id?: number): Observable<Blogs> {
    return this.http.get<Blogs>(this.endpointUrl + 'bookmarked', this.GlobalOpts).pipe(
      retry(this.Retries),
      catchError(this.handleError)
    );
  }

  getUserDetails(): Observable<User>{
    return this.http.get<User>(this.endpointUrl + 'account_details', this.GlobalOpts).pipe(
      retry(this.Retries),
      catchError(this.handleError)
    );
  }

  getMobile(): any{
    return this.http.get<any>(this.endpointUrl + 'phoneNumber', this.GlobalOpts).pipe(
      retry(this.Retries),
      catchError(this.handleError)
    );
  }

  getMyOrders(): Observable<Orders> {
    return this.http.get<Orders>(this.endpointUrl + 'my-orders', this.GlobalOpts).pipe(
      retry(this.Retries),
      catchError(this.handleError)
    );
  }

  getLikedCards(): Observable<Stories> {
    return this.http.get<Stories>(this.endpointUrl + 'liked-cards', this.GlobalOpts).pipe(
      retry(this.Retries),
      catchError(this.handleError)
    );
  }

  getOrder(id: number ): Observable<Order> {
    const urlParams = 'order/' + id;
    return this.http.get<Order>(this.endpointUrl + urlParams, this.GlobalOpts).pipe(
      retry(this.Retries),
      catchError(this.handleError)
    );
  }
  getPhoneNumber(): Observable<number> {
    const urlParams = 'phoneNumber'
    return this.http.get<number>(this.endpointUrl + urlParams, this.GlobalOpts).pipe(
      retry(this.Retries),
      catchError(this.handleError)
    );
  }

}

