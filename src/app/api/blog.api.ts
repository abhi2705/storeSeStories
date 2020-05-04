import { HttpClient } from '@angular/common/http';
import { BaseApi } from './base.api';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Blogs, Blog } from '../models/blog.model';
import { Comment } from '../models/comment.model';

export class BlogApi extends BaseApi {
  private endpointUrl: string;
  constructor(endpoint: string, baseUrl: string, http: HttpClient) {
    super(baseUrl, http);
    this.endpointUrl = this.baseUrl + endpoint;
  }


  get(id?: number): Observable<Blogs | Blog> {
    let urlParam = '';

    if (id === undefined) {
      urlParam += 'all';
    } else {
      urlParam += id;
    }
    return this.http.get<Blogs | Blog>(this.endpointUrl + urlParam, this.GlobalOpts).pipe(
      retry(this.Retries),
      catchError(this.handleError)
    );
  }

  isbookmarked(id: number): Observable<boolean> {
    const urlParam = 'isbookmarked/' + id;
    return this.http.get<boolean>(this.endpointUrl + urlParam, this.GlobalOpts).pipe(
      retry(this.Retries),
      catchError(this.handleError)
    );
  }

  isliked(id: number): Observable<boolean> {
    const urlParam = 'isliked/' + id;
    return this.http.get<boolean>(this.endpointUrl + urlParam, this.GlobalOpts).pipe(
      retry(this.Retries),
      catchError(this.handleError)
    );
  }

  like(id: number): Observable<boolean>{
    const urlParam = 'like/' + id;
    return this.http.post<boolean>(this.endpointUrl + urlParam, this.GlobalOpts).pipe(
      retry(this.Retries),
      catchError(this.handleError)
    );
  }

  unlike(id: number) : Observable<boolean>{
    const urlParam = 'unlike/' + id;
    return this.http.post<boolean>(this.endpointUrl + urlParam, this.GlobalOpts).pipe(
      retry(this.Retries),
      catchError(this.handleError)
    );
  }

  bookmark(id: number) : Observable<boolean>{
    const urlParam = 'bookmark/' + id;
    return this.http.post<boolean>(this.endpointUrl + urlParam, this.GlobalOpts).pipe(
      retry(this.Retries),
      catchError(this.handleError)
    );
  }

  unbookmark(id: number) : Observable<boolean>{
    const urlParam = 'unbookmark/' + id;
    return this.http.post<boolean>(this.endpointUrl + urlParam, this.GlobalOpts).pipe(
      retry(this.Retries),
      catchError(this.handleError)
    );
  }

  getCommentsCount(id : number): Observable<number>{
    const urlParam = 'comments-count/' + id;
    return this.http.get<number>(this.endpointUrl + urlParam, this.GlobalOpts).pipe(
      retry(this.Retries),
      catchError(this.handleError)
    );
  }

  addComment(comment: Comment): Observable<Comment> {
    const urlParam = 'add-comment/';
    return this.http.post<Comment>(this.endpointUrl + urlParam, comment, this.GlobalOpts)
      .pipe(
        retry(this.Retries),
        catchError(this.handleError)
      );
  }

  getBlogsByBrandId(id: number): Observable<Blogs> {
    return this.http.get<Blogs>(this.endpointUrl + 'all/' + id, this.GlobalOpts)
    .pipe(
      retry(this.Retries),
      catchError(this.handleError)
    );
  }


}
