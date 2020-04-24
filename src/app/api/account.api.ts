import { HttpClient } from '@angular/common/http';
import { BaseApi } from './base.api';
import { Observable, from } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Blogs } from '../models/blog.model'
import { Account } from '../models/account.model';
import { Story, Stories } from '../models/story.model';

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

  getLikedCards(): Observable<Stories> {
    return this.http.get<Stories>(this.endpointUrl + 'liked-cards', this.GlobalOpts).pipe(
      retry(this.Retries),
      catchError(this.handleError)
    );
  }
  
}

