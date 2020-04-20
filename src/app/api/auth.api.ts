import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BaseApi } from './base.api';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export class AuthApi extends BaseApi {
  private endpointUrl: string;

  constructor(endpoint: string, baseUrl: string, http: HttpClient) {
      super(baseUrl, http);
      this.endpointUrl = this.baseUrl + endpoint;
  }

  getOtp(mobile: string): Observable<any> {
    const urlParam = 'send_otp/' + mobile;
    return this.http.get(this.endpointUrl + urlParam).pipe(
      catchError(this.handleError)
    );
  }

  verifyOtp(mobileNumber: string, otp: string): Observable<any> {
    return this.http.post(this.endpointUrl + 'authenticate', {
      mobileNumber,
      otp
    }).pipe(
      catchError(this.handleError)
    );
  }

  verifyToken(token: string): Observable<any> {
    return this.http.post(this.endpointUrl + 'verify', {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(
      catchError(this.handleError)
    );
  }

  protected handleError(error: HttpErrorResponse) {
    if (error.status === 403) {
      return throwError('Invalid');
    }
    else {
      return super.handleError(error);
    }
  }
}
