import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class BearerInterceptorService implements HttpInterceptor {
  private auth: AuthService;
  constructor(private inj: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // If request is to /api/auth (exception: /api/auth/logout) or not to the api, then let it pass untouched.
    if (/\/api\/auth\/[^l]+/.test(req.url) || !(/\/api/.test(req.url))) {
      return next.handle(req);
    }
    if (!this.auth) {
      this.auth = this.inj.get(AuthService);
    }
    const addToken = () => {
      const token = this.auth.getToken();
      req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
      return next.handle(req);
    };
    // If logged in then forward request to next handler.
    if (this.auth.isLoggedIn) {
      return addToken();
    }
    // Else wait for getting token and then continue
    return this.waitForToken().pipe(
      switchMap(_ => {
        return addToken();
      })
    );
  }

  private waitForToken(): Observable<any> {
    const auth = this.inj.get(AuthService);
    const obv = new Subject<any>();
    const sub$ = auth.loggedIn.subscribe((b: boolean) => {
      if (b) {
        obv.next();
        sub$.unsubscribe();
      }
    });
    return obv.asObservable();
  }
}
