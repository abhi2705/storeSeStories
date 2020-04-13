/*
This is the BaseApi class that all other api classes inherit from.
Only put functions and attributes common to all Api classes here.
*/

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';

export class BaseApi {
  private readonly USER_ERROR_MESSAGE = 'Oops! Something unexpected happened.';
  // Request options commmon to all requests.
  protected readonly Retries = 0;
  protected readonly GlobalOpts = {};

  constructor(protected baseUrl: string, protected http: HttpClient) {}

  protected handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occured:', error.error.message);
    } else {
      console.error(
        `An error occured in the backend
        Returned code ${error.status}`
      );
    }
    return throwError(this.USER_ERROR_MESSAGE);
  }
}
